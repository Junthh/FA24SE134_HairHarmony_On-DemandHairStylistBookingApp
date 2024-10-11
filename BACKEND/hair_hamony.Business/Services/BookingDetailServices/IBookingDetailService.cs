using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.BookingDetails;

namespace hair_hamony.Business.Services.BookingDetailServices
{
    public interface IBookingDetailService
    {
        Task<(IList<GetBookingDetailModel>, int)> GetAll(PagingParam<BookingDetailEnum.BookingDetailSort> paginationModel, SearchBookingDetailModel searchBookingDetailModel);
        Task<GetBookingDetailModel> GetById(Guid id);
        Task<GetBookingDetailModel> Create(CreateBookingDetailModel requestBody);
        Task<GetBookingDetailModel> Update(Guid id, UpdateBookingDetailModel requestBody);
        Task Delete(Guid id);
    }
}
