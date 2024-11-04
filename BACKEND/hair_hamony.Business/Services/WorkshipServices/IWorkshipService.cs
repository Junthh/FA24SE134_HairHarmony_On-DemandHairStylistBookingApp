using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Workships;

namespace hair_hamony.Business.Services.WorkshipServices
{
    public interface IWorkshipService
    {
        Task<(IList<GetWorkshipModel>, int)> GetAll(PagingParam<WorkshipEnum.WorkshipSort> paginationModel, SearchWorkshipModel searchWorkshipModel);
        Task<GetWorkshipModel> GetById(Guid id);
        Task<GetWorkshipModel> Create(CreateWorkshipModel requestBody);
        Task<GetWorkshipModel> Update(Guid id, UpdateWorkshipModel requestBody);
        Task Delete(Guid id);
    }
}
