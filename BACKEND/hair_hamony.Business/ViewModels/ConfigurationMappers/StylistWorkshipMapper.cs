using AutoMapper;
using hair_hamony.Business.ViewModels.StylistWorkships;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class StylistWorkshipMapper
    {
        public static void ConfigStylistWorkship(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<StylistWorkship, GetStylistWorkshipModel>().ReverseMap();
            configuration.CreateMap<StylistWorkship, UpdateStylistWorkshipModel>().ReverseMap();
        }
    }
}