using AutoMapper;
using hair_hamony.Business.ViewModels.Combos;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class ComboMapper
    {
        public static void ConfigCombo(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Combo, GetComboModel>().ReverseMap();
            configuration.CreateMap<Combo, CreateComboModel>().ReverseMap();
            configuration.CreateMap<Combo, UpdateComboModel>().ReverseMap();
            configuration.CreateMap<Combo, GetDetailComboModel>().ReverseMap();
        }
    }
}