﻿using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.BookingSlotStylists;
using hair_hamony.Business.ViewModels.Stylists;

namespace hair_hamony.Business.Services.BookingSlotStylistServices
{
    public interface IBookingSlotStylistService
    {
        Task<(IList<GetDetailBookingSlotStylistModel>, int)> GetAll(
            PagingParam<BookingSlotStylistEnum.BookingSlotStylistSort> paginationModel, 
            SearchBookingSlotStylistModel searchBookingSlotStylistModel,
            DateOnly? startDate, DateOnly? endDate);
        Task<GetBookingSlotStylistModel> GetById(Guid id);
        Task<GetBookingSlotStylistModel> Create(CreateBookingSlotStylistModel requestBody);
        Task<GetBookingSlotStylistModel> Update(Guid id, UpdateBookingSlotStylistModel requestBody);
        Task Delete(Guid id);
        Task<IList<GetStylistModel>> GetListStylistFreetime(DateOnly bookingDate, Guid timeSlotId, List<Guid> serviceIds);
        Task<IList<GetListTimeSlotModel>> GetListTimeSlot(DateOnly bookingDate, List<Guid> serviceIds);
    }
}
