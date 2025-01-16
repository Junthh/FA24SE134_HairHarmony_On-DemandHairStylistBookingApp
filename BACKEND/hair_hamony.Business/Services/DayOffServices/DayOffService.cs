using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.DayOffs;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.DayOffServices
{
    public class DayOffService : IDayOffService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public DayOffService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetDayOffModel> Create(CreateDayOffModel requestBody)
        {
            var dayOffExisted = await _context.DayOffs.AsNoTracking()
                .Include(x => x.StylistWorkship)
                .ThenInclude(stylistWorkship => stylistWorkship.Workship)
                .FirstOrDefaultAsync(x => x.StylistId == requestBody.StylistId && x.StylistWorkshipId == requestBody.StylistWorkshipId);
            if (dayOffExisted != null && dayOffExisted.IsApprove == true)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = $"Ca làm việc ngày {dayOffExisted.StylistWorkship.RegisterDate} {dayOffExisted.StylistWorkship.Workship.StartTime.Value.ToString("HH:mm")} - {dayOffExisted.StylistWorkship.Workship.EndTime.Value.ToString("HH:mm")} đã xin nghỉ phép"
                };
            }

            var dayOff = _mapper.Map<DayOff>(requestBody);

            var stylistWorkship = await _context.StylistWorkships
                .FirstOrDefaultAsync(x => x.Id == requestBody.StylistWorkshipId);

            int monthRegister = stylistWorkship.RegisterDate.Value.Month;
            int yearRegister = stylistWorkship.RegisterDate.Value.Year;

            var dayoffs = _context.DayOffs
                .Where(x => x.Month == monthRegister && x.Year == yearRegister && x.StylistId == requestBody.StylistId && x.IsApprove == true && x.Type == "P")
                .ToList();

            if (dayoffs.Count == 2)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = $"Bạn đã đăng kí 2 ngày nghỉ phép có lương cho tháng này"
                };
            }

            dayOff.Month = monthRegister;
            dayOff.Year = yearRegister;
            dayOff.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();
            await _context.DayOffs.AddAsync(dayOff);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetDayOffModel>(dayOff);
        }

        public async Task Delete(Guid id)
        {
            var dayOff = _mapper.Map<DayOff>(await GetById(id));
            _context.DayOffs.Remove(dayOff);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetDetailDayOffModel>, int)> GetAll(PagingParam<DayOffEnum.DayOffSort> paginationModel, SearchDayOffModel searchDayOffModel)
        {
            var query = _context.DayOffs
                .Include(dayOff => dayOff.Stylist)
                .Include(dayOff => dayOff.StylistWorkship)
                .ThenInclude(stylistWorkship => stylistWorkship.Workship)
                .AsQueryable();
            query = query.GetWithSearch(searchDayOffModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetDetailDayOffModel>>(query);

            return (results, total);
        }

        public async Task<GetDayOffModel> GetById(Guid id)
        {
            var dayOff = await _context.DayOffs.AsNoTracking()
                .FirstOrDefaultAsync(dayOff => dayOff.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetDayOffModel>(dayOff);
        }

        public async Task<GetDayOffModel> Update(Guid id, UpdateDayOffModel requestBody)
        {
            var dbTransaction = _context.Database.BeginTransaction();
            try
            {
                if (id != requestBody.Id)
                {
                    throw new CException
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        ErrorMessage = "Id không trùng"
                    };
                }

                var dayOff = _mapper.Map<DayOff>(await GetById(id));
                if (requestBody.IsApprove != null && requestBody.IsApprove != dayOff.IsApprove)
                {
                    dayOff.ApprovalDate = UtilitiesHelper.DatetimeNowUTC7();

                    if (requestBody.IsApprove != dayOff.IsApprove && requestBody.IsApprove == true)
                    {
                        int monthRegister = requestBody.Month.Value;
                        int yearRegister = requestBody.Year.Value;

                        var dayoffs = _context.DayOffs
                            .Where(x => x.Month == monthRegister && x.Year == yearRegister && x.StylistId == requestBody.StylistId && x.IsApprove == true && x.Type == "P")
                            .ToList();

                        if (dayoffs.Count == 2)
                        {
                            throw new CException
                            {
                                StatusCode = StatusCodes.Status400BadRequest,
                                ErrorMessage = $"Stylist đã đăng kí 2 ngày nghỉ phép có lương cho tháng này"
                            };
                        }

                        if (requestBody.Type == "KP")
                        {
                            var stylistSalary = await _context.StylistSalarys
                                .FirstOrDefaultAsync(x => x.Year == requestBody.Year && x.Month == requestBody.Month && x.StylistId == requestBody.StylistId);

                            var stylist = await _context.Stylists.FirstOrDefaultAsync(x => x.Id == requestBody.StylistId);

                            var salaryOneDay = stylist!.Salary / 50;

                            stylistSalary.TotalSalary -= salaryOneDay;
                            _context.StylistSalarys.Update(stylistSalary);
                        }
                    }
                }

                var dayOffExisted = await _context.DayOffs.AsNoTracking()
                    .Include(x => x.StylistWorkship)
                    .ThenInclude(stylistWorkship => stylistWorkship.Workship)
                    .FirstOrDefaultAsync(x => x.StylistId == requestBody.StylistId && x.StylistWorkshipId == requestBody.StylistWorkshipId);
                if (dayOffExisted != null && dayOffExisted.IsApprove == true)
                {
                    throw new CException
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        ErrorMessage = $"Ca làm việc ngày {dayOffExisted.StylistWorkship.RegisterDate} {dayOffExisted.StylistWorkship.Workship.StartTime.Value.ToString("HH:mm")} - {dayOffExisted.StylistWorkship.Workship.EndTime.Value.ToString("HH:mm")} đã xin nghỉ phép"
                    };
                }

                _mapper.Map(requestBody, dayOff);

                _context.DayOffs.Update(dayOff);
                await _context.SaveChangesAsync();
                await dbTransaction.CommitAsync();

                return _mapper.Map<GetDayOffModel>(dayOff);
            }
            catch
            {
                await dbTransaction.RollbackAsync();
                throw;
            }
        }
    }
}
