using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.StylistSalaryServices;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.BookingSlotStylists;
using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.BookingSlotStylistServices
{
    public class BookingSlotStylistService : IBookingSlotStylistService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        private readonly IStylistSalaryService _stylistSalaryService;
        public BookingSlotStylistService(IMapper mapper, IStylistSalaryService stylistSalaryService)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
            _stylistSalaryService = stylistSalaryService;
        }

        public async Task<GetBookingSlotStylistModel> Create(CreateBookingSlotStylistModel requestBody)
        {
            var bookingSlotStylist = _mapper.Map<BookingSlotStylist>(requestBody);
            bookingSlotStylist.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();
            bookingSlotStylist.UpdatedDate = UtilitiesHelper.DatetimeNowUTC7();

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

        public async Task<(IList<GetDetailBookingSlotStylistModel>, int)> GetAll(
            PagingParam<BookingSlotStylistEnum.BookingSlotStylistSort> paginationModel,
            SearchBookingSlotStylistModel searchBookingSlotStylistModel,
            DateOnly? startDate, DateOnly? endDate)
        {
            var query = _context.BookingSlotStylists
                .Include(bookingSlotStylist => bookingSlotStylist.Stylist)
                .Include(bookingSlotStylist => bookingSlotStylist.TimeSlot)
                .Include(bookingSlotStylist => bookingSlotStylist.BookingDetail)
                .ThenInclude(bookingDetail => bookingDetail.Booking)
                .Include(bookingSlotStylist => bookingSlotStylist.BookingDetail)
                .ThenInclude(bookingDetail => bookingDetail.Combo)
                .Include(bookingSlotStylist => bookingSlotStylist.BookingDetail)
                .ThenInclude(bookingDetail => bookingDetail.Service)
                .Include(bookingSlotStylist => bookingSlotStylist.BookingDetail)
                .ThenInclude(bookingDetail => bookingDetail.Booking)
                .ThenInclude(booking => booking.Customer)
                .AsQueryable();

            if (startDate != null && endDate != null)
            {
                query = query.Where(bookingSlotStylist =>
                    bookingSlotStylist.BookingDate >= startDate && bookingSlotStylist.BookingDate <= endDate
                );
            }

            query = query.GetWithSearch(searchBookingSlotStylistModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetDetailBookingSlotStylistModel>>(query);

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

        public async Task<IList<GetStylistModel>> GetListStylistFreetime(DateOnly bookingDate, Guid timeSlotId, List<Guid> serviceIds)
        {
            var timeSlot = await _context.TimeSlots
                .AsNoTracking()
                .FirstOrDefaultAsync(timeSlot => timeSlot.Id == timeSlotId);

            var durationService = 0;
            for (int i = 0; i < serviceIds.Count; i++)
            {
                var service = await _context.Services
                .AsNoTracking()
                .FirstOrDefaultAsync(service => service.Id == serviceIds[i]);
                if (service == null)
                {
                    var combo = await _context.Combos
                        .AsNoTracking()
                        .FirstOrDefaultAsync(combo => combo.Id == serviceIds[i]);
                    durationService = combo.Duration!.Value;
                }
                else
                {
                    durationService = service.Duration!.Value;
                }
            }

            // danh sach stylist da dang ki lam viec
            var stylistWorkships = await _context.StylistWorkships.AsNoTracking()
                .Where(stylistWorkship =>
                    stylistWorkship.RegisterDate.Equals(bookingDate)
                    && stylistWorkship.Workship!.StartTime <= timeSlot!.StartTime
                    && stylistWorkship.Workship!.EndTime > timeSlot!.StartTime
                    && (stylistWorkship.DayOffs.Count > 0 ? !stylistWorkship.DayOffs.Any(x => x.IsApprove == true) : stylistWorkship.DayOffs.Count == 0)
                )
                .Select(stylistWorkship => stylistWorkship.StylistId)
                .ToListAsync();

            int countTimeslot = (int)Math.Ceiling((decimal)durationService / 60);

            List<Guid?> bookingSlotStylists = [];

            for (int i = 0; i < countTimeslot; i++)
            {
                var timeSlotNext = await _context.TimeSlots
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.StartTime == timeSlot!.StartTime!.Value.AddHours(i));

                if (timeSlotNext == null)
                {
                    throw new CException
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        ErrorMessage = "Thời gian thực hiện quá thời gian làm việc, vui lòng chọn thời gian sớm hơn"
                    };
                }

                // danh sach stylist da co booking
                var bookingSlotStylist = await _context.BookingSlotStylists
                .Where(bookingSlotStylist =>
                    bookingSlotStylist.BookingDate.Equals(bookingDate)
                    && bookingSlotStylist.TimeSlotId == timeSlotNext.Id
                    && bookingSlotStylist.Status == "Booked")
                .Select(bookingSlotStylist => bookingSlotStylist.StylistId)
                .ToListAsync();

                bookingSlotStylist.ForEach(x => bookingSlotStylists.Add(x.Value));
            }

            // danh sach stylist freetime
            var stylistsFreetime = stylistWorkships.Except(bookingSlotStylists).ToList();

            var stylists = await _context.Stylists
                .AsNoTracking()
                .Where(stylist =>
                    stylistsFreetime.Contains(stylist.Id) && stylist.Status == "Active"
                ).ToListAsync();

            var results = _mapper.Map<IList<GetStylistModel>>(stylists);

            var monthCurrent = UtilitiesHelper.DatetimeNowUTC7().Month;
            var yearCurrent = UtilitiesHelper.DatetimeNowUTC7().Year;
            foreach (var item in results)
            {
                var systemConfig = await _context.SystemConfigs
                    .FirstOrDefaultAsync(systemConfig => systemConfig.Name == "EXPERT_FEE");
                if (item.Level == "Expert")
                {
                    item.ExpertFee = systemConfig.Value;
                }

                var stylistSalary = await _context.StylistSalarys
                    .FirstOrDefaultAsync(stylistSalary =>
                        stylistSalary.StylistId == item.Id
                        && stylistSalary.Month == monthCurrent
                        && stylistSalary.Year == yearCurrent
                    );

                var stylist = await _context.Stylists
                        .FirstOrDefaultAsync(stylist => stylist.Id == item.Id);
                // nếu trong tháng này chưa có booking thì tạo để có dữ liệu so sánh tổng booking trong tháng
                if (stylistSalary == null)
                {
                    var kpi = _context.Kpis.FirstOrDefault(x =>
                                x.StartDate <= DateOnly.FromDateTime(UtilitiesHelper.DatetimeNowUTC7())
                                && x.EndDate >= DateOnly.FromDateTime(UtilitiesHelper.DatetimeNowUTC7()
                                )
                            );
                    await _stylistSalaryService.Create(new ViewModels.StylistSalarys.CreateStylistSalaryModel
                    {
                        Month = monthCurrent,
                        Year = yearCurrent,
                        StylistId = item.Id,
                        TotalBooking = 0,
                        TotalCommission = 0,
                        TotalSalary = 0,
                        Kpi = kpi.Value.Value
                    });
                }
            }

            // sắp xếp theo stylist có tổng booking thấp nhất
            var stylistSorted = from stylist in results
                                join stylistSalary in _context.StylistSalarys on stylist.Id equals stylistSalary.StylistId
                                where stylistSalary.Month == monthCurrent && stylistSalary.Year == yearCurrent
                                orderby stylistSalary.TotalBooking
                                select stylist;

            return stylistSorted.ToList();
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
            bookingSlotStylist.UpdatedDate = UtilitiesHelper.DatetimeNowUTC7();

            _context.BookingSlotStylists.Update(bookingSlotStylist);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetBookingSlotStylistModel>(bookingSlotStylist);
        }
    }
}
