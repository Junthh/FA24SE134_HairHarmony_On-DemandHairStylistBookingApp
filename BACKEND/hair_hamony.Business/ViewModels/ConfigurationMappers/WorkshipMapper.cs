using AutoMapper;
using hair_hamony.Business.ViewModels.Workships;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class WorkshipMapper
    {
        public static void ConfigWorkship(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Workship, GetWorkshipModel>().ReverseMap();
            configuration.CreateMap<Workship, CreateWorkshipModel>().ReverseMap();
            configuration.CreateMap<Workship, UpdateWorkshipModel>().ReverseMap();
        }
    }
}