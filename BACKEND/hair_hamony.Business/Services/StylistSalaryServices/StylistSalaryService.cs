using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.StylistSalarys;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.StylistSalaryServices
{
    public class StylistSalaryService : IStylistSalaryService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public StylistSalaryService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetStylistSalaryModel> Create(CreateStylistSalaryModel requestBody)
        {
            var stylistSalary = _mapper.Map<StylistSalary>(requestBody);
            stylistSalary.CreatedDate = DateTime.Now;

            await _context.StylistSalarys.AddAsync(stylistSalary);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistSalaryModel>(stylistSalary);
        }

        public async Task Delete(Guid id)
        {
            var stylistSalary = _mapper.Map<StylistSalary>(await GetById(id));
            _context.StylistSalarys.Remove(stylistSalary);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetStylistSalaryModel>, int)> GetAll(PagingParam<StylistSalaryEnum.StylistSalarySort> paginationModel, SearchStylistSalaryModel searchStylistSalaryModel)
        {
            var query = _context.StylistSalarys.AsQueryable();
            query = query.GetWithSearch(searchStylistSalaryModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetStylistSalaryModel>>(query);

            return (results, total);
        }

        public async Task<GetStylistSalaryModel> GetById(Guid id)
        {
            var stylistSalary = await _context.StylistSalarys.AsNoTracking().FirstOrDefaultAsync(stylistSalary => stylistSalary.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetStylistSalaryModel>(stylistSalary);
        }

        public async Task<GetStylistSalaryModel> Update(Guid id, UpdateStylistSalaryModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var stylistSalary = _mapper.Map<StylistSalary>(await GetById(id));
            _mapper.Map(requestBody, stylistSalary);

            _context.StylistSalarys.Update(stylistSalary);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistSalaryModel>(stylistSalary);
        }
    }
}
