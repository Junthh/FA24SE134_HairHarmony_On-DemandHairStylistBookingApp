using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.DayOffs;

namespace hair_hamony.Business.Services.DayOffServices
{
    public interface IDayOffService
    {
        Task<(IList<GetDetailDayOffModel>, int)> GetAll(PagingParam<DayOffEnum.DayOffSort> paginationModel, SearchDayOffModel searchDayOffModel);
        Task<GetDayOffModel> GetById(Guid id);
        Task<GetDayOffModel> Create(CreateDayOffModel requestBody);
        Task<GetDayOffModel> Update(Guid id, UpdateDayOffModel requestBody);
        Task Delete(Guid id);
    }
}
