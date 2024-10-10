using hair_hamony.Data.Repositories;
using hair_hamony.Data.Repositories.RoleRepositories;
using hair_hamony.Data.Repositories.UserRepositories;
using Microsoft.Extensions.DependencyInjection;

namespace hair_hamony.Data.Services
{
    public static class ModuleRegister
    {
        public static void RegisterRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
