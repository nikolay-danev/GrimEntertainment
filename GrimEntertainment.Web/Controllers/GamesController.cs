using System.Collections.Generic;
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

            var model = mapper.Map<List<GameUpsertViewModel>>(games);

            return Ok(model);
        }

        [HttpPost]
        [Authorize]
        [Route("/Games/Publish")]
        public IActionResult Publish([FromForm] GameUpsertViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }

            var user = userService.GetUser(Request.Headers["Authorization"].ToString());

            var newGame = mapper.Map<Game>(model);

            newGame.Creator = user;
            newGame.CreatorId = user.Id;

            context.Games.Add(newGame);
            context.SaveChanges();

            return Ok(model);
        }
    }
}