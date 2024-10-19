using AutoMapper;
using hair_hamony.Business.ViewModels.Levels;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class LevelMapper
    {
        public static void ConfigLevel(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Level, GetLevelModel>().ReverseMap();
            configuration.CreateMap<Level, CreateLevelModel>().ReverseMap();
            configuration.CreateMap<Level, UpdateLevelModel>().ReverseMap();
        }
    }
}