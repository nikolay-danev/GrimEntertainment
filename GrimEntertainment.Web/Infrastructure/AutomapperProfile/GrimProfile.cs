using AutoMapper;
using GrimEntertainment.Web.Data.Models;

namespace GrimEntertainment.Web.Infrastructure.AutomapperProfile
{
    public class GrimProfile : Profile
    {
        public GrimProfile()
        {
            CreateMap<Game, GameUpsertViewModel>()
                .ReverseMap();

            CreateMap<User, UserViewModel>()
                .ReverseMap();

            CreateMap<User, UserLoginModel>()
                .ReverseMap();
        }
    }
}
