using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.StaffSalarys;

namespace hair_hamony.Business.Services.StaffSalaryServices
{
    public interface IStaffSalaryService
    {
        Task<(IList<GetDetailStaffSalaryModel>, int)> GetAll(
            PagingParam<StaffSalaryEnum.StaffSalarySort> paginationModel,
            SearchStaffSalaryModel searchStaffSalaryModel,
            string? staffName);
        Task<GetStaffSalaryModel> GetById(Guid id);
        Task<GetStaffSalaryModel> Create(CreateStaffSalaryModel requestBody);
        Task<GetStaffSalaryModel> Update(Guid id, UpdateStaffSalaryModel requestBody);
        Task Delete(Guid id);
    }
}
