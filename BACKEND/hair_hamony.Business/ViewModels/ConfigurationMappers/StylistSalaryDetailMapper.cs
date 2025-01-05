using AutoMapper;
using hair_hamony.Business.ViewModels.StylistSalaryDetails;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class StylistSalaryDetailMapper
    {
        public static void ConfigStylistSalaryDetail(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<StylistSalaryDetail, GetStylistSalaryDetailModel>().ReverseMap();
            configuration.CreateMap<StylistSalaryDetail, CreateStylistSalaryDetailModel>().ReverseMap();
            configuration.CreateMap<StylistSalaryDetail, UpdateStylistSalaryDetailModel>().ReverseMap();
            configuration.CreateMap<StylistSalaryDetail, GetDetailStylistSalaryDetailModel>().ReverseMap();
        }
    }
}