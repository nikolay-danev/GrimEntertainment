﻿using GrimEntertainment.Web.Data;
using GrimEntertainment.Web.Data.Models;
using GrimEntertainment.Web.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace GrimEntertainment.Web.Controllers
{
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly GrimDbContext context;
        private readonly IHashService hashService;
        private readonly IConfiguration configuration;

        public AccountController(GrimDbContext context, IHashService hashService, IConfiguration configuration)
        {
            this.context = context;
            this.hashService = hashService;
            this.configuration = configuration;
        }

        [HttpGet]
        [Authorize]
        [Route("/Account/User/{id}")]
        public IActionResult GetUser(string id)
        {
            var user = context.Users.FirstOrDefault(x => x.Id.ToString() == id);

            if(user == null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "User not found!" });
            }

            user.HashedPassword = "";

            return Ok(user);
        }

        [HttpPost]
        [Authorize]
        [Route("/Account/Update")]
        public IActionResult Update(UpdateUserViewModel model)
        {
            var user = context.Users.FirstOrDefault(x => x.Email == model.Email);
            if(user == null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "User not found!" });
            }
            if(model.Username == string.Empty || model.Username == null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Username cannot be empty!" });
            }
            if(user.Username != model.Username)
            {
                user.Username = model.Username;
                context.Users.Update(user);
                context.SaveChanges();
            }
            return Ok(user);
        }

        [HttpPost]
        [Route("/Account/Register")]
        public IActionResult Register(UserViewModel model)
        {
            if (ModelState.IsValid && model.Password.Equals(model.ConfirmPassword))
            {
                if(context.Users.ToList().Any(x => x.Email == model.Email || x.Username == model.Username))
                {
                    return BadRequest(new ErrorModel { ErrorMessage = "User already exists with this email or username!" });
                }

                var newUser = new User
                {
                    Email = model.Email,
                    Username = model.Username,
                    HashedPassword = hashService.HashPassword(model.Password)
                };

                context.Users.Add(newUser);
                context.SaveChanges();

                return Ok(model);
            }
            return BadRequest(new ErrorModel { ErrorMessage = "Invalid data!" });
        }

        [HttpPost]
        [Route("/Account/Login")]
        public IActionResult Login(UserLoginModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Invalid input data!" });
            }

            var user = CheckIfUserAuthIsValid(model);

            if(user == null)
            {
                return BadRequest(new ErrorModel { ErrorMessage = "Invalid username or password!" });
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("Secret"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("id", user.Id),
                    new Claim("username", user.Username)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.AuthToken = tokenHandler.WriteToken(token);

            return Ok(user);
        }

        private UserLoginModel CheckIfUserAuthIsValid(UserLoginModel model)
        {
            UserLoginModel user = null;

            var entity = context.Users.FirstOrDefault(x => x.Username == model.Username);
            
            if(entity != null && hashService.Validate(entity.HashedPassword, model.Password))
            {
                user = new UserLoginModel
                {
                    Id = entity.Id.ToString(),
                    Username = entity.Username
                };
            }

            return user;
        }
    }
}