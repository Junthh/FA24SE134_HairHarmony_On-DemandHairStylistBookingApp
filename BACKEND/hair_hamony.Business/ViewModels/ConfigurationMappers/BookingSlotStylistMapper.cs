using AutoMapper;
using hair_hamony.Business.ViewModels.BookingSlotStylists;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class BookingSlotStylistMapper
    {
        public static void ConfigBookingSlotStylist(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<BookingSlotStylist, GetBookingSlotStylistModel>().ReverseMap();
            configuration.CreateMap<BookingSlotStylist, CreateBookingSlotStylistModel>().ReverseMap();
            configuration.CreateMap<BookingSlotStylist, UpdateBookingSlotStylistModel>().ReverseMap();
            configuration.CreateMap<BookingSlotStylist, GetDetailBookingSlotStylistModel>().ReverseMap();
        }
    }
}