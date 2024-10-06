using hair_hamony.Data.Entities;
using hair_hamony.Data.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace hair_hamony.Data
{
    public static class ModuleRegister
    {
        public static IServiceCollection RegisterData(this IServiceCollection services)
        {
            // Register DbContext
            services.AddScoped<DbContext, HairHamonyContext>();
            // services.RegisterRepository();
            return services;
        }
    }
}
