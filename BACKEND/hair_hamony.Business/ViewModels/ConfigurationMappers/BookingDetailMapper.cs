using AutoMapper;
using hair_hamony.Business.ViewModels.BookingDetails;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class BookingDetailMapper
    {
        public static void ConfigBookingDetail(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<BookingDetail, GetBookingDetailModel>().ReverseMap();
            configuration.CreateMap<BookingDetail, CreateBookingDetailModel>().ReverseMap();
            configuration.CreateMap<BookingDetail, UpdateBookingDetailModel>().ReverseMap();
            configuration.CreateMap<BookingDetail, GetDetailBookingDetailModel>().ReverseMap();
        }
    }
}