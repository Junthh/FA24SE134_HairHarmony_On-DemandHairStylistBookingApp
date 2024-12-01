using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.BookingDetails;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.BookingDetailServices
{
    public class BookingDetailService : IBookingDetailService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public BookingDetailService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetBookingDetailModel> Create(CreateBookingDetailModel requestBody)
        {
            var bookingDetail = _mapper.Map<BookingDetail>(requestBody);
            bookingDetail.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();

            await _context.BookingDetails.AddAsync(bookingDetail);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetBookingDetailModel>(bookingDetail);
        }

        public async Task Delete(Guid id)
        {
            var bookingDetail = _mapper.Map<BookingDetail>(await GetById(id));
            _context.BookingDetails.Remove(bookingDetail);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetBookingDetailModel>, int)> GetAll(PagingParam<BookingDetailEnum.BookingDetailSort> paginationModel, SearchBookingDetailModel searchBookingDetailModel)
        {
            var query = _context.BookingDetails.AsQueryable();
            query = query.GetWithSearch(searchBookingDetailModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetBookingDetailModel>>(query);

            return (results, total);
        }

        public async Task<GetBookingDetailModel> GetById(Guid id)
        {
            var bookingDetail = await _context.BookingDetails.AsNoTracking().FirstOrDefaultAsync(bookingDetail => bookingDetail.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetBookingDetailModel>(bookingDetail);
        }

        public async Task<GetBookingDetailModel> Update(Guid id, UpdateBookingDetailModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var bookingDetail = _mapper.Map<BookingDetail>(await GetById(id));
            _mapper.Map(requestBody, bookingDetail);

            _context.BookingDetails.Update(bookingDetail);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetBookingDetailModel>(bookingDetail);
        }
    }
}
