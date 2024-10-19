using AutoMapper;
using hair_hamony.Business.ViewModels.SystemConfigs;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class SystemConfigMapper
    {
        public static void ConfigSystemConfig(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<SystemConfig, GetSystemConfigModel>().ReverseMap();
            configuration.CreateMap<SystemConfig, CreateSystemConfigModel>().ReverseMap();
            configuration.CreateMap<SystemConfig, UpdateSystemConfigModel>().ReverseMap();
        }
    }
}