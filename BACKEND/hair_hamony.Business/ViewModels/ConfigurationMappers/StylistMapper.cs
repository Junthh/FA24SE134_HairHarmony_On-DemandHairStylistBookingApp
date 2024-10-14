using AutoMapper;
using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class StylistMapper
    {
        public static void ConfigStylist(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Stylist, GetStylistModel>().ReverseMap();
            configuration.CreateMap<Stylist, CreateStylistModel>().ReverseMap();
            configuration.CreateMap<Stylist, UpdateStylistModel>().ReverseMap();
        }
    }
}