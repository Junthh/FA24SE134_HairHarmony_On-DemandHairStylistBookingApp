using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Services;

namespace hair_hamony.Business.Services.ServiceServices
{
    public interface IServiceService
    {
        Task<(IList<GetServiceModel>, int)> GetAll(PagingParam<ServiceEnum.ServiceSort> paginationModel, SearchServiceModel searchServiceModel);
        Task<GetServiceModel> GetById(Guid id);
        Task<GetServiceModel> Create(CreateServiceModel requestBody);
        Task<GetServiceModel> Update(Guid id, UpdateServiceModel requestBody);
        Task Delete(Guid id);
    }
}
