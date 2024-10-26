using AutoMapper;
using hair_hamony.Business.ViewModels.PaymentDetails;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class PaymentDetailMapper
    {
        public static void ConfigPaymentDetail(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<PaymentDetail, GetPaymentDetailModel>().ReverseMap();
            configuration.CreateMap<PaymentDetail, CreatePaymentDetailModel>().ReverseMap();
            configuration.CreateMap<PaymentDetail, UpdatePaymentDetailModel>().ReverseMap();
        }
    }
}