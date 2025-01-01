using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.StylistWorkships;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.StylistWorkshipServices
{
    public class StylistWorkshipService : IStylistWorkshipService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public StylistWorkshipService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<IList<GetStylistWorkshipModel>> Create(CreateStylistWorkshipModel requestBody)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var stylistWorkships = new List<StylistWorkship>();
                if (requestBody.WorkshipIds != null && requestBody.WorkshipIds.Any())
                {
                    var timeKeepingId = Guid.NewGuid();

                    var monthRegister = requestBody.RegisterDate.Value.Month;
                    var yearRegister = requestBody.RegisterDate.Value.Year;
                    var timekeeping = _context.Timekeepings.FirstOrDefault(x => x.Month == monthRegister && x.Year == yearRegister);
                    if (timekeeping == null)
                    {
                        _context.Timekeepings.Add(new Timekeeping
                        {
                            Id = timeKeepingId,
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                            IsTimekeepping = false,
                            Month = monthRegister,
                            Year = yearRegister,
                        });
                    }

                    foreach (var workshipId in requestBody.WorkshipIds)
                    {
                        var stylistWorkship = _context.StylistWorkships
                            .FirstOrDefault(stylistWorkship =>
                                stylistWorkship.RegisterDate == requestBody.RegisterDate
                                && stylistWorkship.WorkshipId == workshipId
                                && stylistWorkship.StylistId == requestBody.StylistId
                            );

                        if (stylistWorkship != null)
                        {
                            var workship = _context.Workships.FirstOrDefault(workship => workship.Id == workshipId);
                            throw new CException
                            {
                                StatusCode = StatusCodes.Status400BadRequest,
                                ErrorMessage = $"Ca làm việc {workship.StartTime.Value.ToString("HH:mm")} - {workship.EndTime.Value.ToString("HH:mm")} ngày " +
                                    $"{requestBody.RegisterDate.Value.ToString("dd/MM/yyyy")} " +
                                    $"đã được đăng ký, vui lòng chọn ca làm việc khác"
                            };
                        }

                        var newStylistWorkship = new StylistWorkship
                        {
                            RegisterDate = requestBody.RegisterDate,
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                            UpdatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                            WorkshipId = workshipId,
                            StylistId = requestBody.StylistId,
                            IsTimekeeping = false,
                            TimekeepingId = timekeeping != null ? timekeeping.Id : timeKeepingId,
                        };
                        _context.StylistWorkships.Add(newStylistWorkship);
                        stylistWorkships.Add(newStylistWorkship);
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return _mapper.Map<IList<GetStylistWorkshipModel>>(stylistWorkships);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task Delete(Guid id)
        {
            var stylistWorkship = _mapper.Map<StylistWorkship>(await GetById(id));
            var workship = _context.Workships.FirstOrDefault(workship => workship.Id == stylistWorkship.WorkshipId);

            var bookingSlotStylists = await _context.BookingSlotStylists
                .AnyAsync(x =>
                    x.TimeSlot!.StartTime > workship!.StartTime &&
                    x.TimeSlot.StartTime < workship.EndTime &&
                    x.StylistId == stylistWorkship!.StylistId &&
                    x.Status == "Booked");

            if (bookingSlotStylists)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = $"Bạn đang có khách hàng đặt lịch trong khoảng thời gian {workship.StartTime.Value.ToString("HH:mm")} " +
                        $"- {workship.EndTime.Value.ToString("HH:mm")} ngày " +
                        $"{stylistWorkship.RegisterDate.Value.ToString("dd/MM/yyyy")} nên không thể xoá lịch làm việc"
                };
            }
            _context.StylistWorkships.Remove(stylistWorkship);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetDetailStylistWorkshipModel>, int)> GetAll(
            PagingParam<StylistWorkshipEnum.StylistWorkshipSort> paginationModel,
            SearchStylistWorkshipModel searchStylistWorkshipModel,
            DateOnly? startDate, DateOnly? endDate)
        {
            var query = _context.StylistWorkships
                .Include(stylistWorkship => stylistWorkship.Workship)
                .Include(stylistWorkship => stylistWorkship.Stylist)
                .Include(stylistWorkship => stylistWorkship.Timekeeping)
                .Include(stylistWorkship => stylistWorkship.DayOffs)
                .AsQueryable();

            if (startDate != null && endDate != null)
            {
                query = query.Where(stylistWorkship =>
                    stylistWorkship.RegisterDate >= startDate && stylistWorkship.RegisterDate <= endDate
                );
            }

            query = query.GetWithSearch(searchStylistWorkshipModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetDetailStylistWorkshipModel>>(query);

            return (results, total);
        }

        public async Task<GetStylistWorkshipModel> GetById(Guid id)
        {
            var stylistWorkship = await _context.StylistWorkships.AsNoTracking().FirstOrDefaultAsync(stylistWorkship => stylistWorkship.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetStylistWorkshipModel>(stylistWorkship);
        }

        public async Task<GetStylistWorkshipModel> Update(Guid id, UpdateStylistWorkshipModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }

            var stylistWorkship = _context.StylistWorkships
                            .FirstOrDefault(stylistWorkship =>
                                stylistWorkship.RegisterDate == requestBody.RegisterDate
                                && stylistWorkship.WorkshipId == requestBody.WorkshipId
                                && stylistWorkship.StylistId == requestBody.StylistId
                            );

            if (stylistWorkship != null)
            {
                var workship = _context.Workships.FirstOrDefault(workship => workship.Id == requestBody.WorkshipId);
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = $"Ca làm việc {workship.StartTime.Value.ToString("HH:mm")} - {workship.EndTime.Value.ToString("HH:mm")} ngày " +
                            $"{requestBody.RegisterDate.Value.ToString("dd/MM/yyyy")}" +
                            $"đã được đăng ký, vui lòng chọn ca làm việc khác"
                };
            }

            var updateStylistWorkship = _mapper.Map<StylistWorkship>(await GetById(id));

            var oldWorkship = _context.Workships.FirstOrDefault(workship => workship.Id == updateStylistWorkship.WorkshipId);

            var bookingSlotStylists = await _context.BookingSlotStylists
                .AnyAsync(x =>
                    x.TimeSlot!.StartTime > oldWorkship!.StartTime &&
                    x.TimeSlot.StartTime < oldWorkship.EndTime &&
                    x.StylistId == updateStylistWorkship!.StylistId &&
                    x.Status == "Booked");

            if (bookingSlotStylists)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = $"Bạn đang có khách hàng đặt lịch trong khoảng thời gian {oldWorkship.StartTime.Value.ToString("HH:mm")} " +
                        $"- {oldWorkship.EndTime.Value.ToString("HH:mm")} ngày " +
                        $"{updateStylistWorkship.RegisterDate.Value.ToString("dd/MM/yyyy")} nên không thể cập nhật lịch làm việc"
                };
            }

            _mapper.Map(requestBody, updateStylistWorkship);
            updateStylistWorkship.UpdatedDate = UtilitiesHelper.DatetimeNowUTC7();

            _context.StylistWorkships.Update(updateStylistWorkship);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistWorkshipModel>(updateStylistWorkship);
        }

        public IList<GetStylistWorkshipByMonthModel> GetByMonthAndYear(int month, int year)
        {
            var results = new List<GetStylistWorkshipByMonthModel>();
            var firstDayOfMonth = new DateTime(year, month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddSeconds(-1);

            var stylists = _context.Stylists.Where(x => x.Status == "Active").OrderBy(x => x.FullName).ToList();
            var workships = _context.Workships.OrderBy(x => x.StartTime).ToList();
            //for (int i = 0; i < lastDayOfMonth.Day; i++)
            //{
            //    var currentDate = new DateOnly(year, month, i + 1);
            //    var stylistWorkshipByMonth = new GetStylistWorkshipByMonthModel();
            //    stylistWorkshipByMonth.Date = currentDate;

            //    for (int j = 0; j < stylists.Count; j++)
            //    {
            //        var workShipModels = new List<GetStylistWorkshipByMonthModel.WorkShipModel>();
            //        for (int k = 0; k < workships.Count; k++)
            //        {
            //            var stylistWorkship = _context.StylistWorkships
            //                .FirstOrDefault(x => x.WorkshipId == workships[k].Id && x.StylistId == stylists[j].Id && x.RegisterDate == currentDate);

            //            workShipModels.Add(new GetStylistWorkshipByMonthModel.WorkShipModel
            //            {
            //                Time = workships[k].StartTime + "-" + workships[k].EndTime,
            //                IsRegister = stylistWorkship != null ? true : false,
            //            });
            //        }

            //        stylistWorkshipByMonth.Stylists.Add(new GetStylistWorkshipByMonthModel.StylistModel
            //        {
            //            Id = stylists[j].Id,
            //            FullName = stylists[j].FullName,
            //            Username = stylists[j].Username,
            //            Workships = workShipModels,
            //        });
            //    }

            //    results.Add(stylistWorkshipByMonth);
            //}

            // Tập hợp danh sách ngày trong tháng
            var allDates = Enumerable.Range(1, lastDayOfMonth.Day)
                .Select(day => new DateOnly(year, month, day))
                .ToList();

            // Truy xuất tất cả các dữ liệu StylistWorkship cần thiết trong một lần truy vấn
            var stylistWorkships = _context.StylistWorkships
                .Where(x => allDates.Contains(x.RegisterDate.Value))
                .ToList();

            // Tạo từ điển để tìm kiếm nhanh hơn
            var stylistWorkshipLookup = stylistWorkships
                .ToLookup(x => (x.RegisterDate, x.StylistId, x.WorkshipId));

            // Duyệt qua các ngày và tạo kết quả
            foreach (var currentDate in allDates)
            {
                var stylistWorkshipByMonth = new GetStylistWorkshipByMonthModel
                {
                    Date = currentDate,
                    Stylists = stylists.Select(stylist => new GetStylistWorkshipByMonthModel.StylistModel
                    {
                        Id = stylist.Id,
                        FullName = stylist.FullName,
                        Username = stylist.Username,
                        Workships = workships.Select(workship => new GetStylistWorkshipByMonthModel.WorkShipModel
                        {
                            Time = workship.StartTime + "-" + workship.EndTime,
                            IsRegister = stylistWorkshipLookup.Contains((currentDate, stylist.Id, workship.Id))
                        }).ToList()
                    }).ToList()
                };

                results.Add(stylistWorkshipByMonth);
            }


            return results;
        }
    }
}
