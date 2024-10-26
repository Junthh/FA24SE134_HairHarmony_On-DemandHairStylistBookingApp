using hair_hamony.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace hair_hamony.Data.Services
{
    public static class ModuleRegister
    {
        public static void RegisterRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        }
    }
}
