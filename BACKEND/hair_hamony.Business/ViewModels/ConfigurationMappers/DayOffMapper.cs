using AutoMapper;
using hair_hamony.Business.ViewModels.DayOffs;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class DayOffMapper
    {
        public static void ConfigDayOff(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<DayOff, GetDayOffModel>().ReverseMap();
            configuration.CreateMap<DayOff, CreateDayOffModel>().ReverseMap();
            configuration.CreateMap<DayOff, UpdateDayOffModel>().ReverseMap();
            configuration.CreateMap<DayOff, GetDetailDayOffModel>().ReverseMap();
        }
    }
}