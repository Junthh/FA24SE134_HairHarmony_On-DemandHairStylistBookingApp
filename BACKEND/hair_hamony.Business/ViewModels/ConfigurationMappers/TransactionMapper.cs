using AutoMapper;
using hair_hamony.Business.ViewModels.Transactions;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class TransactionMapper
    {
        public static void ConfigTransaction(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Transaction, GetTransactionModel>().ReverseMap();
            configuration.CreateMap<Transaction, CreateTransactionModel>().ReverseMap();
            configuration.CreateMap<Transaction, UpdateTransactionModel>().ReverseMap();
        }
    }
}