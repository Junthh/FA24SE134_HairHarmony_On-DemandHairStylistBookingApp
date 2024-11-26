using hair_hamony.Business.Services.BookingDetailServices;
using hair_hamony.Business.Services.BookingServices;
using hair_hamony.Business.Services.BookingSlotStylistServices;
using hair_hamony.Business.Services.CategoryServices;
using hair_hamony.Business.Services.ComboServices;
using hair_hamony.Business.Services.ComboServiceServices;
using hair_hamony.Business.Services.CustomerServices;
using hair_hamony.Business.Services.FeedbackServices;
using hair_hamony.Business.Services.File;
using hair_hamony.Business.Services.NewsServices;
using hair_hamony.Business.Services.OwnerServices;
using hair_hamony.Business.Services.PaymentDetailServices;
using hair_hamony.Business.Services.PaymentServices;
using hair_hamony.Business.Services.ServiceServices;
using hair_hamony.Business.Services.StaffSalaryServices;
using hair_hamony.Business.Services.StaffServices;
using hair_hamony.Business.Services.StylistSalaryServices;
using hair_hamony.Business.Services.StylistServices;
using hair_hamony.Business.Services.StylistWorkshipServices;
using hair_hamony.Business.Services.SystemConfigServices;
using hair_hamony.Business.Services.TimeSlotServices;
using hair_hamony.Business.Services.TransactionServices;
using hair_hamony.Business.Services.WorkshipServices;
using hair_hamony.Business.Utilities;
using Microsoft.Extensions.DependencyInjection;

namespace hair_hamony.Business.Services
{
    public static class ModuleRegister
    {
        public static void RegisterServivce(this IServiceCollection services)
        {
            services.AddScoped<IJwtHelper, JwtHelper>();
            services.AddScoped<IFileService, FileService>();

            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<IBookingDetailService, BookingDetailService>();
            services.AddScoped<IBookingSlotStylistService, BookingSlotStylistService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IComboService, ComboService>();
            services.AddScoped<IServiceService, ServiceService>();
            services.AddScoped<IStylistService, StylistService>();
            services.AddScoped<IComboServiceService, ComboServiceService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IStylistSalaryService, StylistSalaryService>();
            services.AddScoped<IStylistWorkshipService, StylistWorkshipService>();
            services.AddScoped<ISystemConfigService, SystemConfigService>();
            services.AddScoped<IFeedbackService, FeedbackService>();
            services.AddScoped<ITimeSlotService, TimeSlotService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IWorkshipService, WorkshipService>();
            services.AddScoped<INewsService, NewsService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IPaymentDetailService, PaymentDetailService>();
            services.AddScoped<IOwnerService, OwnerService>();
            services.AddScoped<IStaffService, StaffService>();
            services.AddScoped<IStaffSalaryService, StaffSalaryService>();
        }
    }
}
