using AutoMapper;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class UserMapper
    {
        public static void ConfigUser(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<User, GetUserModel>().ReverseMap();
            configuration.CreateMap<User, CreateUserModel>().ReverseMap();
            configuration.CreateMap<User, UpdateUserModel>().ReverseMap();
            configuration.CreateMap<User, GetUserDetailModel>().ReverseMap();
        }
    }
}