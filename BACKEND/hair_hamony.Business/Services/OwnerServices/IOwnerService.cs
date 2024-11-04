using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Owners;
using hair_hamony.Business.ViewModels.Users;

namespace hair_hamony.Business.Services.OwnerServices
{
    public interface IOwnerService
    {
        Task<(IList<GetOwnerModel>, int)> GetAll(PagingParam<OwnerEnum.OwnerSort> paginationModel, SearchOwnerModel searchOwnerModel);
        Task<GetOwnerModel> GetById(Guid id);
        Task<GetOwnerModel> Create(CreateOwnerModel requestBody);
        Task<GetOwnerModel> Update(Guid id, UpdateOwnerModel requestBody);
        Task Delete(Guid id);
        Task<(string token, GetOwnerModel owner)> Login(UserLoginModel requestBody);
        Task<GetOwnerModel> ChangePassword(Guid id, string oldPassword, string newPassword);
    }
}
