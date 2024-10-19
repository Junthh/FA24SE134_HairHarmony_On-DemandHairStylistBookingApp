using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Feedbacks;

namespace hair_hamony.Business.Services.FeedbackServices
{
    public interface IFeedbackService
    {
        Task<(IList<GetFeedbackModel>, int)> GetAll(PagingParam<FeedbackEnum.FeedbackSort> paginationModel, SearchFeedbackModel searchFeedbackModel);
        Task<GetFeedbackModel> GetById(Guid id);
        Task<GetFeedbackModel> Create(CreateFeedbackModel requestBody);
        Task<GetFeedbackModel> Update(Guid id, UpdateFeedbackModel requestBody);
        Task Delete(Guid id);
    }
}
