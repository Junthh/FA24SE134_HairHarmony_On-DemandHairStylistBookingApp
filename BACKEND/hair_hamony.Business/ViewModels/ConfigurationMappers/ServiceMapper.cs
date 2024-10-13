using AutoMapper;
using hair_hamony.Business.ViewModels.Services;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class ServiceMapper
    {
        public static void ConfigService(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Service, GetServiceModel>().ReverseMap();
            configuration.CreateMap<Service, CreateServiceModel>().ReverseMap();
            configuration.CreateMap<Service, UpdateServiceModel>().ReverseMap();
        }
    }
}