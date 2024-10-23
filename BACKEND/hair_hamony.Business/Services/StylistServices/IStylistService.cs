using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Stylists;

namespace hair_hamony.Business.Services.StylistServices
{
    public interface IStylistService
    {
        Task<(IList<GetDetailStylistModel>, int)> GetAll(PagingParam<StylistEnum.StylistSort> paginationModel, SearchStylistModel searchStylistModel);
        Task<GetStylistModel> GetById(Guid id);
        Task<GetStylistModel> Create(CreateStylistModel requestBody);
        Task<GetStylistModel> Update(Guid id, UpdateStylistModel requestBody);
        Task Delete(Guid id);
    }
}
