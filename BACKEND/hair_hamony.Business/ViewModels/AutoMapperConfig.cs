using AutoMapper;
using home_travel.Business.ViewModels.ConfigurationMappers;
using Microsoft.Extensions.DependencyInjection;

namespace hair_hamony.Business.ViewModels;

public static class AutoMapperConfig
{
    public static void ConfigureAutoMapper(this IServiceCollection services)
    {
        var mappingConfig = new MapperConfiguration(mc =>
        {
            mc.ConfigRole();
            mc.ConfigUser();
            mc.ConfigBooking();
            mc.ConfigBookingDetail();
            mc.ConfigBookingSlotStylist();
            mc.ConfigCategory();
            mc.ConfigCombo();
            mc.ConfigService();
            mc.ConfigStylist();
            mc.ConfigComboService();
            mc.ConfigCustomer();
            mc.ConfigStylistSalary();
            mc.ConfigStylistWorkship();
            mc.ConfigSystemConfig();
            mc.ConfigFeedback();
            mc.ConfigLevel();
            mc.ConfigTimeSlot();
            mc.ConfigTransaction();
            mc.ConfigTransactionDetail();
            mc.ConfigWorkship();
            mc.ConfigNew();
            mc.ConfigPayment();
        });

        IMapper mapper = mappingConfig.CreateMapper();
        services.AddSingleton(mapper);
    }
}