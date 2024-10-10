using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;

namespace hair_hamony.Business.Services.UserServices
{
    public interface IUserService
    {
        Task<(IList<GetUserModel>, int)> GetAll(PagingParam<UserEnum.UserSort> paginationModel, SearchUserModel searchUserModel);
        Task<GetUserModel> GetById(Guid id);
        Task<GetUserModel> Create(CreateUserModel requestBody);
        Task<GetUserModel> Update(Guid id, UpdateUserModel requestBody);
        Task Delete(Guid id);
        Task<(string token, User user)> Login(UserLoginModel requestBody);
        Task<GetUserModel> ChangePassword(Guid id, string oldPassword, string newPassword);
    }
}
