using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.TimeSlots;

namespace hair_hamony.Business.Services.TimeSlotServices
{
    public interface ITimeSlotService
    {
        Task<(IList<GetTimeSlotModel>, int)> GetAll(PagingParam<TimeSlotEnum.TimeSlotSort> paginationModel, SearchTimeSlotModel searchTimeSlotModel);
        Task<GetTimeSlotModel> GetById(Guid id);
        Task<GetTimeSlotModel> Create(CreateTimeSlotModel requestBody);
        Task<GetTimeSlotModel> Update(Guid id, UpdateTimeSlotModel requestBody);
        Task Delete(Guid id);
    }
}
