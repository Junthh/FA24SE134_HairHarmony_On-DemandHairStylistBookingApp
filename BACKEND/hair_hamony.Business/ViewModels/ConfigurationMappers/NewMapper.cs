using AutoMapper;
using hair_hamony.Business.ViewModels.News;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class NewMapper
    {
        public static void ConfigNew(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<News, GetNewsModel>().ReverseMap();
            configuration.CreateMap<News, CreateNewsModel>().ReverseMap();
            configuration.CreateMap<News, UpdateNewsModel>().ReverseMap();
        }
    }
}