using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Timekeepings;

namespace hair_hamony.Business.Services.TimekeepingServices
{
    public interface ITimekeepingService
    {
        Task<(IList<GetTimekeepingModel>, int)> GetAll(PagingParam<TimekeepingEnum.TimekeepingSort> paginationModel, SearchTimekeepingModel searchTimekeepingModel);
        Task<GetTimekeepingModel> GetById(Guid id);
        Task<GetTimekeepingModel> Create(CreateTimekeepingModel requestBody);
        Task<GetTimekeepingModel> Update(Guid id, UpdateTimekeepingModel requestBody);
        Task Delete(Guid id);
    }
}
