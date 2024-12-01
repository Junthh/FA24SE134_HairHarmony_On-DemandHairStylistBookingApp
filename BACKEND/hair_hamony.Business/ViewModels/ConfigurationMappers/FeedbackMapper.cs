using AutoMapper;
using hair_hamony.Business.ViewModels.Feedbacks;
using hair_hamony.Data.Entities;

namespace home_travel.Business.ViewModels.ConfigurationMappers
{
    public static class FeedbackMapper
    {
        public static void ConfigFeedback(this IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Feedback, GetFeedbackModel>().ReverseMap();
            configuration.CreateMap<Feedback, GetDetailFeedbackModel>().ReverseMap();
            configuration.CreateMap<Feedback, CreateFeedbackModel>().ReverseMap();
            configuration.CreateMap<Feedback, UpdateFeedbackModel>().ReverseMap();
        }
    }
}