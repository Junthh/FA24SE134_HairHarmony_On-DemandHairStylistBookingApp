using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.BookingSlotStylists;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.BookingSlotStylistServices
{
    public class BookingSlotStylistService : IBookingSlotStylistService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public BookingSlotStylistService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetBookingSlotStylistModel> Create(CreateBookingSlotStylistModel requestBody)
        {
            var bookingSlotStylist = _mapper.Map<BookingSlotStylist>(requestBody);
            bookingSlotStylist.CreatedDate = DateTime.Now;
            bookingSlotStylist.UpdatedDate = DateTime.Now;
            await _context.BookingSlotStylists.AddAsync(bookingSlotStylist);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetBookingSlotStylistModel>(bookingSlotStylist);
        }

        public async Task Delete(Guid id)
        {
            var bookingSlotStylist = _mapper.Map<BookingSlotStylist>(await GetById(id));
            _context.BookingSlotStylists.Remove(bookingSlotStylist);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetBookingSlotStylistModel>, int)> GetAll(PagingParam<BookingSlotStylistEnum.BookingSlotStylistSort> paginationModel, SearchBookingSlotStylistModel searchBookingSlotStylistModel)
        {
            var query = _context.BookingSlotStylists.AsQueryable();
            query = query.GetWithSearch(searchBookingSlotStylistModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetBookingSlotStylistModel>>(query);

            return (results, total);
        }

        public async Task<GetBookingSlotStylistModel> GetById(Guid id)
        {
            var bookingSlotStylist = await _context.BookingSlotStylists.AsNoTracking().FirstOrDefaultAsync(bookingSlotStylist => bookingSlotStylist.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetBookingSlotStylistModel>(bookingSlotStylist);
        }

        public async Task<GetBookingSlotStylistModel> Update(Guid id, UpdateBookingSlotStylistModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var bookingSlotStylist = _mapper.Map<BookingSlotStylist>(await GetById(id));
            _mapper.Map(requestBody, bookingSlotStylist);
            bookingSlotStylist.UpdatedDate = DateTime.Now;
            _context.BookingSlotStylists.Update(bookingSlotStylist);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetBookingSlotStylistModel>(bookingSlotStylist);
        }
    }
}
