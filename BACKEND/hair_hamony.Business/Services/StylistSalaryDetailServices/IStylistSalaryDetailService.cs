using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.StylistSalaryDetails;

namespace hair_hamony.Business.Services.StylistSalaryDetailServices
{
    public interface IStylistSalaryDetailService
    {
        Task<(IList<GetDetailStylistSalaryDetailModel>, int)> GetAll(PagingParam<StylistSalaryDetailEnum.StylistSalaryDetailSort> paginationModel,
            SearchStylistSalaryDetailModel searchStylistSalaryDetailModel);
        Task<GetStylistSalaryDetailModel> GetById(Guid id);
        Task<GetStylistSalaryDetailModel> Create(CreateStylistSalaryDetailModel requestBody);
        Task<GetStylistSalaryDetailModel> Update(Guid id, UpdateStylistSalaryDetailModel requestBody);
        Task Delete(Guid id);
    }
}
