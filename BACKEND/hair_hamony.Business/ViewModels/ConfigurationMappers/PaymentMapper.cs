using AutoMapper;
using hair_hamony.Business.ViewModels.Payments;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class PaymentMapper
    {
        public static void ConfigPayment(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Payment, GetPaymentModel>().ReverseMap();
            configuration.CreateMap<Payment, CreatePaymentModel>().ReverseMap();
            configuration.CreateMap<Payment, UpdatePaymentModel>().ReverseMap();
        }
    }
}