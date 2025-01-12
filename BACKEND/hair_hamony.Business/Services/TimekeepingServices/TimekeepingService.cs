using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Timekeepings;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.TimekeepingServices
{
    public class TimekeepingService : ITimekeepingService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public TimekeepingService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetTimekeepingModel> Create(CreateTimekeepingModel requestBody)
        {
            var timekeeping = _mapper.Map<Timekeeping>(requestBody);
            timekeeping.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();
            timekeeping.IsTimekeepping = false;

            await _context.Timekeepings.AddAsync(timekeeping);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetTimekeepingModel>(timekeeping);
        }

        public async Task Delete(Guid id)
        {
            var timekeeping = _mapper.Map<Timekeeping>(await GetById(id));
            _context.Timekeepings.Remove(timekeeping);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetTimekeepingModel>, int)> GetAll(PagingParam<TimekeepingEnum.TimekeepingSort> paginationModel, SearchTimekeepingModel searchTimekeepingModel)
        {
            var query = _context.Timekeepings.AsQueryable();
            query = query.GetWithSearch(searchTimekeepingModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetTimekeepingModel>>(query);

            return (results, total);
        }

        public async Task<GetTimekeepingModel> GetById(Guid id)
        {
            var timekeeping = await _context.Timekeepings.AsNoTracking().FirstOrDefaultAsync(timekeeping => timekeeping.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetTimekeepingModel>(timekeeping);
        }

        public async Task<GetTimekeepingModel> Update(Guid id, UpdateTimekeepingModel requestBody)
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
                var timekeeping = _mapper.Map<Timekeeping>(await GetById(id));

                if (requestBody.IsTimekeepping != timekeeping.IsTimekeepping && requestBody.IsTimekeepping == true)
                {
                    _context.StylistWorkships
                        .Where(stylistWorkship => stylistWorkship.TimekeepingId == requestBody.Id)
                        .ExecuteUpdate(setters =>
                            setters.SetProperty(stylistWorkship =>
                            stylistWorkship.IsTimekeeping, true
                            )
                        );

                    var stylistSalarys = await _context.StylistSalarys
                        .Where(x => x.Year == requestBody.Year && x.Month == requestBody.Month)
                        .ToListAsync();

                    foreach (var stylistSalary in stylistSalarys)
                    {
                        var stylist = await _context.Stylists.FirstOrDefaultAsync(x => x.Id == stylistSalary.StylistId);

                        double? salaryKpiMinus = 0;
                        var totalSalary = stylist!.Salary;
                        if (stylistSalary.TotalBooking < stylistSalary.Kpi)
                        {
                            var salaryKpiOneBooking = stylist!.Salary / stylistSalary.Kpi;
                            salaryKpiMinus = salaryKpiOneBooking * (stylistSalary.Kpi - stylistSalary.TotalBooking);
                        }

                        var count = await _context.DayOffs
                            .CountAsync(x => x.Year == requestBody.Year &&
                                x.Month == requestBody.Month && x.IsApprove == true &&
                                x.Type == "KP" && x.StylistId == stylistSalary.StylistId
                            );

                        double? salaryOffMinus = 0;
                        if (count > 0)
                        {
                            var salaryOneDay = stylist!.Salary / 50;

                            salaryOffMinus = salaryOneDay * (50 - count);
                        }

                        stylistSalary.TotalSalary = (totalSalary - salaryOffMinus - salaryKpiMinus) + stylistSalary.TotalCommission;
                        _context.StylistSalarys.Update(stylistSalary);
                    }
                }

                _mapper.Map(requestBody, timekeeping);

                _context.Timekeepings.Update(timekeeping);
                await _context.SaveChangesAsync();
                await dbTransaction.CommitAsync();

                return _mapper.Map<GetTimekeepingModel>(timekeeping);
            }
            catch
            {
                await dbTransaction.RollbackAsync();
                throw;
            }
        }
    }
}
