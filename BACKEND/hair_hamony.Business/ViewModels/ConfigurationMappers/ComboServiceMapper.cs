using AutoMapper;
using hair_hamony.Business.ViewModels.ComboServices;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class ComboServiceMapper
    {
        public static void ConfigComboService(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<ComboService, GetComboServiceModel>().ReverseMap();
            configuration.CreateMap<ComboService, CreateComboServiceModel>().ReverseMap();
            configuration.CreateMap<ComboService, UpdateComboServiceModel>().ReverseMap();
        }
    }
}