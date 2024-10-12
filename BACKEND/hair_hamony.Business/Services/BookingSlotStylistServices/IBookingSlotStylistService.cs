using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.BookingSlotStylists;

namespace hair_hamony.Business.Services.BookingSlotStylistServices
{
    public interface IBookingSlotStylistService
    {
        Task<(IList<GetBookingSlotStylistModel>, int)> GetAll(PagingParam<BookingSlotStylistEnum.BookingSlotStylistSort> paginationModel, SearchBookingSlotStylistModel searchBookingSlotStylistModel);
        Task<GetBookingSlotStylistModel> GetById(Guid id);
        Task<GetBookingSlotStylistModel> Create(CreateBookingSlotStylistModel requestBody);
        Task<GetBookingSlotStylistModel> Update(Guid id, UpdateBookingSlotStylistModel requestBody);
        Task Delete(Guid id);
    }
}
