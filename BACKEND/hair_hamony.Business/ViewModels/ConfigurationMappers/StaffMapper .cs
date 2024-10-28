using AutoMapper;
using hair_hamony.Business.ViewModels.Staffs;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class StaffMapper
    {
        public static void ConfigStaff(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Staff, GetStaffModel>().ReverseMap();
            configuration.CreateMap<Staff, CreateStaffModel>().ReverseMap();
            configuration.CreateMap<Staff, UpdateStaffModel>().ReverseMap();
        }
    }
}