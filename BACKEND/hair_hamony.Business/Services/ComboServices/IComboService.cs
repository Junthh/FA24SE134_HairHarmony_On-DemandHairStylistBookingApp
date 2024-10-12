using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Combos;

namespace hair_hamony.Business.Services.ComboServices
{
    public interface IComboService
    {
        Task<(IList<GetComboModel>, int)> GetAll(PagingParam<ComboEnum.ComboSort> paginationModel, SearchComboModel searchComboModel);
        Task<GetComboModel> GetById(Guid id);
        Task<GetComboModel> Create(CreateComboModel requestBody);
        Task<GetComboModel> Update(Guid id, UpdateComboModel requestBody);
        Task Delete(Guid id);
    }
}
