using AutoMapper;
using hair_hamony.Business.ViewModels.Timekeepings;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class TimekeepingMapper
    {
        public static void ConfigTimekeeping(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Timekeeping, GetTimekeepingModel>().ReverseMap();
            configuration.CreateMap<Timekeeping, CreateTimekeepingModel>().ReverseMap();
            configuration.CreateMap<Timekeeping, UpdateTimekeepingModel>().ReverseMap();
        }
    }
}