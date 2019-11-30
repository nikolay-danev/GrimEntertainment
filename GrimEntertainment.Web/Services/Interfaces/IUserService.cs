using GrimEntertainment.Web.Data.Models;

namespace GrimEntertainment.Web.Services.Interfaces
{
    public interface IUserService
    {
        User GetUser(string authToken);

        void RegisterUser(User user);

        void LoginUser(User user);
    }
}
