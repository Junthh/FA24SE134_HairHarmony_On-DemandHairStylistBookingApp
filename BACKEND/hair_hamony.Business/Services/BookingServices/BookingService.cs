using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Bookings;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.BookingServices
{
    public class BookingService : IBookingService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public BookingService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetBookingModel> Create(CreateBookingModel requestBody)
        {
            var booking = _mapper.Map<Booking>(requestBody);
            booking.CreatedDate = DateTime.Now;
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetBookingModel>(booking);
        }

        public async Task Delete(Guid id)
        {
            var booking = _mapper.Map<Booking>(await GetById(id));
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetBookingModel>, int)> GetAll(PagingParam<BookingEnum.BookingSort> paginationModel, SearchBookingModel searchBookingModel)
        {
            var query = _context.Bookings.AsQueryable();
            query = query.GetWithSearch(searchBookingModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetBookingModel>>(query);

            return (results, total);
        }

        public async Task<GetBookingModel> GetById(Guid id)
        {
            var booking = await _context.Bookings.AsNoTracking().FirstOrDefaultAsync(booking => booking.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetBookingModel>(booking);
        }

        public async Task<GetBookingModel> Update(Guid id, UpdateBookingModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var booking = _mapper.Map<Booking>(await GetById(id));
            booking.BookingDate = requestBody.BookingDate;
            booking.ExpertFee = requestBody.ExpertFee;
            booking.TotalPrice = requestBody.TotalPrice;
            booking.AmoutToPaid = requestBody.AmoutToPaid;
            booking.LoyaltyPoints = requestBody.LoyaltyPoints;
            booking.Status = requestBody.Status;
            booking.CustomerId = requestBody.CustomerId;
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetBookingModel>(booking);
        }
    }
}
