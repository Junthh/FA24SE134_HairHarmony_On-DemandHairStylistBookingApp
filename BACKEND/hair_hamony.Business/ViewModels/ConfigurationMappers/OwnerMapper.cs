using AutoMapper;
using hair_hamony.Business.ViewModels.Owners;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class OwnerMapper
    {
        public static void ConfigOwner(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Owner, GetOwnerModel>().ReverseMap();
            configuration.CreateMap<Owner, CreateOwnerModel>().ReverseMap();
            configuration.CreateMap<Owner, UpdateOwnerModel>().ReverseMap();
        }
    }
}