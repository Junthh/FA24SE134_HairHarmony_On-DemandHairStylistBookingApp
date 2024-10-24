using AutoMapper;
using hair_hamony.Business.ViewModels.TransactionDetails;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class TransactionDetailMapper
    {
        public static void ConfigTransactionDetail(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<TransactionDetail, GetTransactionDetailModel>().ReverseMap();
            configuration.CreateMap<TransactionDetail, CreateTransactionDetailModel>().ReverseMap();
            configuration.CreateMap<TransactionDetail, UpdateTransactionDetailModel>().ReverseMap();
        }
    }
}