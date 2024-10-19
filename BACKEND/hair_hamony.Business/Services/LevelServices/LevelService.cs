using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Levels;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.LevelServices
{
    public class LevelService : ILevelService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public LevelService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetLevelModel> Create(CreateLevelModel requestBody)
        {
            var level = _mapper.Map<Level>(requestBody);
            level.CreatedDate = DateTime.Now;
            level.UpdatedDate = DateTime.Now;
            await _context.Levels.AddAsync(level);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetLevelModel>(level);
        }

        public async Task Delete(Guid id)
        {
            var level = _mapper.Map<Level>(await GetById(id));
            _context.Levels.Remove(level);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetLevelModel>, int)> GetAll(PagingParam<LevelEnum.LevelSort> paginationModel, SearchLevelModel searchLevelModel)
        {
            var query = _context.Levels.AsQueryable();
            query = query.GetWithSearch(searchLevelModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetLevelModel>>(query);

            return (results, total);
        }

        public async Task<GetLevelModel> GetById(Guid id)
        {
            var level = await _context.Levels.AsNoTracking().FirstOrDefaultAsync(level => level.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetLevelModel>(level);
        }

        public async Task<GetLevelModel> Update(Guid id, UpdateLevelModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var level = _mapper.Map<Level>(await GetById(id));
            level.UpdatedDate = DateTime.Now;
            _context.Levels.Update(level);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetLevelModel>(level);
        }
    }
}
