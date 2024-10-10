using hair_hamony.Business.Services;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels;
using Microsoft.Extensions.DependencyInjection;

namespace hair_hamony.Business
{
    public static class ModuleRegister
    {
        public static IServiceCollection RegisterBusiness(this IServiceCollection services)
        {
            services.RegisterServivce();
            services.RegisterErrorHandling();
            services.ConfigureAutoMapper();
            return services;
        }
    }
}
