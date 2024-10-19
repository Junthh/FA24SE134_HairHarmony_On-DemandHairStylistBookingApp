using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.StylistSalarys;

namespace hair_hamony.Business.Services.StylistSalaryServices
{
    public interface IStylistSalaryService
    {
        Task<(IList<GetStylistSalaryModel>, int)> GetAll(PagingParam<StylistSalaryEnum.StylistSalarySort> paginationModel, SearchStylistSalaryModel searchStylistSalaryModel);
        Task<GetStylistSalaryModel> GetById(Guid id);
        Task<GetStylistSalaryModel> Create(CreateStylistSalaryModel requestBody);
        Task<GetStylistSalaryModel> Update(Guid id, UpdateStylistSalaryModel requestBody);
        Task Delete(Guid id);
    }
}
