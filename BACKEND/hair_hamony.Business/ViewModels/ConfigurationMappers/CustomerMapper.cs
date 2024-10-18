using AutoMapper;
using hair_hamony.Business.ViewModels.Customers;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class CustomerMapper
    {
        public static void ConfigCustomer(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Customer, GetCustomerModel>().ReverseMap();
            configuration.CreateMap<Customer, CreateCustomerModel>().ReverseMap();
            configuration.CreateMap<Customer, UpdateCustomerModel>().ReverseMap();
        }
    }
}