using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Roles;

namespace hair_hamony.Business.Services.RoleServices
{
    public interface IRoleService
    {
        Task<(IList<GetRoleModel>, int)> GetAll(PagingParam<RoleEnum.RoleSort> paginationModel, SearchRoleModel searchRoleModel);
        Task<GetRoleModel> GetById(Guid id);
        Task<GetRoleModel> Create(CreateRoleModel requestBody);
        Task<GetRoleModel> Update(Guid id, UpdateRoleModel requestBody);
        Task Delete(Guid id);
    }
}
