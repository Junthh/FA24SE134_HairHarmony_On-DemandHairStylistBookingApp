using AutoMapper;
using hair_hamony.Business.ViewModels.Roles;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class RoleMapper
    {
        public static void ConfigRole(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Role, GetRoleModel>().ReverseMap();
            configuration.CreateMap<Role, CreateRoleModel>().ReverseMap();
            configuration.CreateMap<Role, UpdateRoleModel>().ReverseMap();
        }
    }
}