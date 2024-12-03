using AutoMapper;
using hair_hamony.Business.ViewModels.Kpis;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class KpiMapper
    {
        public static void ConfigKpi(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Kpi, GetKpiModel>().ReverseMap();
            configuration.CreateMap<Kpi, CreateKpiModel>().ReverseMap();
            configuration.CreateMap<Kpi, UpdateKpiModel>().ReverseMap();
        }
    }
}