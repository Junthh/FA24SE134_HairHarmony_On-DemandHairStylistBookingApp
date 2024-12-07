using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Kpis;

namespace hair_hamony.Business.Services.KpiServices
{
    public interface IKpiService
    {
        Task<(IList<GetKpiModel>, int)> GetAll(PagingParam<KpiEnum.KpiSort> paginationModel, SearchKpiModel searchKpiModel);
        Task<GetKpiModel> GetById(Guid id);
        Task<GetKpiModel> Create(CreateKpiModel requestBody);
        Task<GetKpiModel> Update(Guid id, UpdateKpiModel requestBody);
        Task Delete(Guid id);
    }
}
