using GrimEntertainment.Web.Data;
using GrimEntertainment.Web.Data.Models;
using GrimEntertainment.Web.Services.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace GrimEntertainment.Web.Services
{
    public class UserService : IUserService
    {
        private readonly GrimDbContext dbContext;

        public UserService(GrimDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public User GetUser(string authToken)
        {
            var token = authToken.Replace("Bearer", "").Trim();
            var tokenHandler = new JwtSecurityTokenHandler();
            var userId = tokenHandler.ReadJwtToken(token).Claims.ToList()[0].Value;

            var user = dbContext.Users.FirstOrDefault(x => x.Id == Guid.Parse(userId));

            return user;
        }

        public void LoginUser(User user)
        {
            throw new System.NotImplementedException();
        }

        public void RegisterUser(User user)
        {
            throw new System.NotImplementedException();
        }
    }
}
