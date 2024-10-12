﻿using hair_hamony.Business.Services.BookingDetailServices;
using hair_hamony.Business.Services.BookingServices;
using hair_hamony.Business.Services.BookingSlotStylistServices;
using hair_hamony.Business.Services.CategoryServices;
using hair_hamony.Business.Services.ComboServices;
using hair_hamony.Business.Services.RoleServices;
using hair_hamony.Business.Services.UserServices;
using hair_hamony.Business.Utilities;
using Microsoft.Extensions.DependencyInjection;

namespace hair_hamony.Business.Services
{
    public static class ModuleRegister
    {
        public static void RegisterServivce(this IServiceCollection services)
        {
            services.AddScoped<IJwtHelper, JwtHelper>();

            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<IBookingDetailService, BookingDetailService>();
            services.AddScoped<IBookingSlotStylistService, BookingSlotStylistService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IComboService, ComboService>();
        }
    }
}
