using AutoMapper;
using hair_hamony.Business.ViewModels.Bookings;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class BookingMapper
    {
        public static void ConfigBooking(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Booking, GetBookingModel>().ReverseMap();
            configuration.CreateMap<Booking, CreateBookingModel>().ReverseMap();
            configuration.CreateMap<Booking, UpdateBookingModel>().ReverseMap();
            configuration.CreateMap<Booking, GetDetailBookingModel>().ReverseMap();
        }
    }
}