using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Staffs;
using hair_hamony.Business.ViewModels.Users;

namespace hair_hamony.Business.Services.StaffServices
{
    public interface IStaffService
    {
        Task<(IList<GetStaffModel>, int)> GetAll(PagingParam<StaffEnum.StaffSort> paginationModel, SearchStaffModel searchStaffModel);
        Task<GetStaffModel> GetById(Guid id);
        Task<GetStaffModel> Create(CreateStaffModel requestBody);
        Task<GetStaffModel> Update(Guid id, UpdateStaffModel requestBody);
        Task Delete(Guid id);
        Task<(string token, GetStaffModel staff)> Login(UserLoginModel requestBody);
        Task<GetStaffModel> ChangePassword(Guid id, string oldPassword, string newPassword);
    }
}
