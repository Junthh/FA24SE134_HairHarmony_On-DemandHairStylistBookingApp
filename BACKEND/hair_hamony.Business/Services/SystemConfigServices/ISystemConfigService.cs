using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.SystemConfigs;

namespace hair_hamony.Business.Services.SystemConfigServices
{
    public interface ISystemConfigService
    {
        Task<(IList<GetSystemConfigModel>, int)> GetAll(PagingParam<SystemConfigEnum.SystemConfigSort> paginationModel, SearchSystemConfigModel searchSystemConfigModel);
        Task<GetSystemConfigModel> GetById(Guid id);
        Task<GetSystemConfigModel> Create(CreateSystemConfigModel requestBody);
        Task<GetSystemConfigModel> Update(Guid id, UpdateSystemConfigModel requestBody);
        Task Delete(Guid id);
    }
}
