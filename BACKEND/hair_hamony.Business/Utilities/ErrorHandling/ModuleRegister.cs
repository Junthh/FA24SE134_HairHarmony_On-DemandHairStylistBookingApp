using Microsoft.Extensions.DependencyInjection;

namespace hair_hamony.Business.Utilities.ErrorHandling
{
    /// <summary>
    /// DI Service classes for error handling.
    /// </summary>
    /// <param name="services">Service container from Program.</param>
    public static class ModuleRegister
    {
        public static void RegisterErrorHandling(this IServiceCollection services)
        {
            services.AddTransient<IErrorHandler, ErrorHandler>();
        }

    }
}
