using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.StaffSalarys;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.StaffSalaryServices
{
    public class StaffSalaryService : IStaffSalaryService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public StaffSalaryService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetStaffSalaryModel> Create(CreateStaffSalaryModel requestBody)
        {
            var staffSalary = _mapper.Map<StaffSalary>(requestBody);
            staffSalary.CreatedDate = DateTime.Now;

            await _context.StaffSalarys.AddAsync(staffSalary);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStaffSalaryModel>(staffSalary);
        }

        public async Task Delete(Guid id)
        {
            var staffSalary = _mapper.Map<StaffSalary>(await GetById(id));
            _context.StaffSalarys.Remove(staffSalary);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetDetailStaffSalaryModel>, int)> GetAll(PagingParam<StaffSalaryEnum.StaffSalarySort> paginationModel, SearchStaffSalaryModel searchStaffSalaryModel)
        {
            var query = _context.StaffSalarys
                .Include(staffSalary => staffSalary.Staff)
                .AsQueryable();

            query = query.GetWithSearch(searchStaffSalaryModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.ProjectTo<GetDetailStaffSalaryModel>(query);

            return (results.ToList(), total);
        }

        public async Task<GetStaffSalaryModel> GetById(Guid id)
        {
            var staffSalary = await _context.StaffSalarys.AsNoTracking().FirstOrDefaultAsync(staffSalary => staffSalary.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetStaffSalaryModel>(staffSalary);
        }

        public async Task<GetStaffSalaryModel> Update(Guid id, UpdateStaffSalaryModel requestBody)
        {
            var staffSalary = _mapper.Map<StaffSalary>(await GetById(id));
            _mapper.Map(requestBody, staffSalary);

            _context.StaffSalarys.Update(staffSalary);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStaffSalaryModel>(staffSalary);
        }
    }
}
