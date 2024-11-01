using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.SystemConfigs;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.SystemConfigServices
{
    public class SystemConfigService : ISystemConfigService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public SystemConfigService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetSystemConfigModel> Create(CreateSystemConfigModel requestBody)
        {
            var systemConfig = _mapper.Map<SystemConfig>(requestBody);

            await _context.SystemConfigs.AddAsync(systemConfig);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetSystemConfigModel>(systemConfig);
        }

        public async Task Delete(Guid id)
        {
            var systemConfig = _mapper.Map<SystemConfig>(await GetById(id));
            _context.SystemConfigs.Remove(systemConfig);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetSystemConfigModel>, int)> GetAll(PagingParam<SystemConfigEnum.SystemConfigSort> paginationModel, SearchSystemConfigModel searchSystemConfigModel)
        {
            var query = _context.SystemConfigs.AsQueryable();
            query = query.GetWithSearch(searchSystemConfigModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetSystemConfigModel>>(query);

            return (results, total);
        }

        public async Task<GetSystemConfigModel> GetById(Guid id)
        {
            var systemConfig = await _context.SystemConfigs.AsNoTracking().FirstOrDefaultAsync(systemConfig => systemConfig.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetSystemConfigModel>(systemConfig);
        }

        public async Task<GetSystemConfigModel> Update(Guid id, UpdateSystemConfigModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var systemConfig = _mapper.Map<SystemConfig>(await GetById(id));
            _mapper.Map(requestBody, systemConfig);

            _context.SystemConfigs.Update(systemConfig);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetSystemConfigModel>(systemConfig);
        }
    }
}
