using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Business.ViewModels.Users;

namespace hair_hamony.Business.Services.StylistServices
{
    public interface IStylistService
    {
        Task<(IList<GetDetailStylistModel>, int)> GetAll(PagingParam<StylistEnum.StylistSort> paginationModel, SearchStylistModel searchStylistModel);
        Task<GetStylistModel> GetById(Guid id);
        Task<GetStylistModel> Create(CreateStylistModel requestBody);
        Task<GetStylistModel> Update(Guid id, UpdateStylistModel requestBody);
        Task Delete(Guid id);
        Task<(string token, GetStylistModel stylist)> Login(UserLoginModel requestBody);
        Task<GetStylistModel> ChangePassword(Guid id, string oldPassword, string newPassword);
    }
}
