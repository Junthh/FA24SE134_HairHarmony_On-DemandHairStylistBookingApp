﻿using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Bookings;

namespace hair_hamony.Business.Services.BookingServices
{
    public interface IBookingService
    {
        Task<(IList<GetBookingModel>, int)> GetAll(PagingParam<BookingEnum.BookingSort> paginationModel, SearchBookingModel searchBookingModel);
        Task<GetBookingModel> GetById(Guid id);
        Task<GetBookingModel> Create(CreateBookingModel requestBody);
        Task<GetBookingModel> Update(Guid id, UpdateBookingModel requestBody);
        Task Delete(Guid id);
    }
}
