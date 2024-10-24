using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Workships;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.WorkshipServices
{
    public class WorkshipService : IWorkshipService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public WorkshipService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetWorkshipModel> Create(CreateWorkshipModel requestBody)
        {
            var workship = _mapper.Map<Workship>(requestBody);
            workship.CreatedDate = DateTime.Now;
            await _context.Workships.AddAsync(workship);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetWorkshipModel>(workship);
        }

        public async Task Delete(Guid id)
        {
            var workship = _mapper.Map<Workship>(await GetById(id));
            _context.Workships.Remove(workship);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetWorkshipModel>, int)> GetAll(PagingParam<WorkshipEnum.WorkshipSort> paginationModel, SearchWorkshipModel searchWorkshipModel)
        {
            var query = _context.Workships.AsQueryable();
            query = query.GetWithSearch(searchWorkshipModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetWorkshipModel>>(query);

            return (results, total);
        }

        public async Task<GetWorkshipModel> GetById(Guid id)
        {
            var workship = await _context.Workships.AsNoTracking().FirstOrDefaultAsync(workship => workship.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetWorkshipModel>(workship);
        }

        public async Task<GetWorkshipModel> Update(Guid id, UpdateWorkshipModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var workship = _mapper.Map<Workship>(await GetById(id));
            _context.Workships.Update(workship);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetWorkshipModel>(workship);
        }
    }
}
