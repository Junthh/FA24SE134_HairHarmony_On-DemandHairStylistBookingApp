using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.StylistWorkships;

namespace hair_hamony.Business.Services.StylistWorkshipServices
{
    public interface IStylistWorkshipService
    {
        Task<(IList<GetDetailStylistWorkshipModel>, int)> GetAll(
            PagingParam<StylistWorkshipEnum.StylistWorkshipSort> paginationModel,
            SearchStylistWorkshipModel searchStylistWorkshipModel,
            DateOnly? startDate, DateOnly? endDate);
        Task<GetStylistWorkshipModel> GetById(Guid id);
        Task<IList<GetStylistWorkshipModel>> Create(CreateStylistWorkshipModel requestBody);
        Task<GetStylistWorkshipModel> Update(Guid id, UpdateStylistWorkshipModel requestBody);
        Task Delete(Guid id);
    }
}
