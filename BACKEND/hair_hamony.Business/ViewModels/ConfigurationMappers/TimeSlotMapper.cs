using AutoMapper;
using hair_hamony.Business.ViewModels.TimeSlots;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class TimeSlotMapper
    {
        public static void ConfigTimeSlot(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<TimeSlot, GetTimeSlotModel>().ReverseMap();
            configuration.CreateMap<TimeSlot, CreateTimeSlotModel>().ReverseMap();
            configuration.CreateMap<TimeSlot, UpdateTimeSlotModel>().ReverseMap();
        }
    }
}