using AutoMapper;
using hair_hamony.Business.ViewModels.StaffSalarys;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class StaffSalaryMapper
    {
        public static void ConfigStaffSalary(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<StaffSalary, GetStaffSalaryModel>().ReverseMap();
            configuration.CreateMap<StaffSalary, GetDetailStaffSalaryModel>().ReverseMap();
            configuration.CreateMap<StaffSalary, CreateStaffSalaryModel>().ReverseMap();
            configuration.CreateMap<StaffSalary, UpdateStaffSalaryModel>().ReverseMap();
        }
    }
}