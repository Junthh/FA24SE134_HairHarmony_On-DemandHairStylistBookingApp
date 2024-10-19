using AutoMapper;
using hair_hamony.Business.ViewModels.StylistSalarys;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class StylistSalaryMapper
    {
        public static void ConfigStylistSalary(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<StylistSalary, GetStylistSalaryModel>().ReverseMap();
            configuration.CreateMap<StylistSalary, CreateStylistSalaryModel>().ReverseMap();
            configuration.CreateMap<StylistSalary, UpdateStylistSalaryModel>().ReverseMap();
        }
    }
}