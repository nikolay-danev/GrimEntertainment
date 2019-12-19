using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using GrimEntertainment.Web.Data;
using GrimEntertainment.Web.Data.Models;
using GrimEntertainment.Web.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GrimEntertainment.Web.Controllers
{
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly GrimDbContext context;
        private readonly IMapper mapper;
        private readonly IUserService userService;

        public GamesController(GrimDbContext context, IMapper mapper, IUserService userService)
        {
            this.context = context;
            this.mapper = mapper;
            this.userService = userService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("/Games")]
        public IActionResult GetAllGames()
        {
            var games = context.Games.ToList();

            foreach (var game in games)
            {
                game.TrailerUrl = game.TrailerUrl.Replace("watch?v=", "embed/") + "?autoplay=1";
            }

            //var model = mapper.Map<List<GameUpsertViewModel>>(games);

            return Ok(games);
        }

        [HttpPost]
        [Authorize]
        [Route("/Games/Publish")]
        public IActionResult Publish([FromForm] GameUpsertViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Invalid game input data!" });
            }
            var game = context.Games.FirstOrDefault(x => x.Title == model.Title);
            if (game != null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Game with this title already exists!" });
            }
            var user = userService.GetUser(Request.Headers["Authorization"].ToString());

            var newGame = mapper.Map<Game>(model);

            newGame.Creator = user;
            newGame.CreatorId = user.Id;

            if (model.BannerUrl != null)
            {
                var path = @"D:\Projects\GrimEntertainment\GrimEntertainment.Web\ClientApp\public\GamesImages";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                var filePath = Path.Combine(path, model.BannerUrl.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.BannerUrl.CopyTo(fileStream);
                }
                newGame.BannerUrl = $"/GamesImages/{model.BannerUrl.FileName}";
            }
            context.Games.Add(newGame);
            context.SaveChanges();

            return Ok(newGame);
        }

        [HttpGet]
        [Authorize]
        [Route("/Game/Like/{id}")]
        public IActionResult LikeGame(string id)
        {
            var game = context.Games.FirstOrDefault(x => x.Id.ToString() == id);
            if(game == null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Game not found!" });
            }

            game.Rating += 1;
            context.Games.Update(game);
            context.SaveChanges();

            return Ok(game);
        }

        [HttpGet]
        [Authorize]
        [Route("/Game/Get/{id}")]
        public IActionResult GetGame(string id)
        {
            var game = context.Games.FirstOrDefault(x => x.Id.ToString() == id);
            if (game == null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Game not found!" });
            }

            return Ok(game);
        }


        [HttpPost]
        [Authorize]
        [Route("/Games/Delete")]
        public IActionResult RemoveGame(UserGameViewModel model)
        {
            var game = context.Games.FirstOrDefault(x => x.Id.ToString() == model.GameId && x.CreatorId.ToString() == model.UserId);

            if(game == null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Game not found!" });
            }

            context.Games.Remove(game);
            context.SaveChanges();

            return Ok(model);
        }

        [HttpPost]
        [Authorize]
        [Route("/Games/Edit")]
        public IActionResult EditGame(EditGameViewModel model)
        {
            var game = context.Games.FirstOrDefault(x => x.Id.ToString() == model.Id);

            if (game == null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Game not found!" });
            }

            if(model.Title == null || 
                model.Title == string.Empty || model.Publisher == null ||
                model.Publisher == string.Empty)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Title and Publisher should not be empty!" });
            }
            
            game.Title = model.Title;
            game.Publisher = model.Publisher;
            game.DownloadLink = model.DownloadLink;
            game.TrailerUrl = model.TrailerUrl;
            game.Description = model.Description;

            context.Games.Update(game);
            context.SaveChanges();

            return Ok(game);
        }
    }
}