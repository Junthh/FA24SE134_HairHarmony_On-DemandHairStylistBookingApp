using AutoMapper;
using hair_hamony.Business.ViewModels.Categories;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class CategoryMapper
    {
        public static void ConfigCategory(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Category, GetCategoryModel>().ReverseMap();
            configuration.CreateMap<Category, CreateCategoryModel>().ReverseMap();
            configuration.CreateMap<Category, UpdateCategoryModel>().ReverseMap();
        }
    }
}