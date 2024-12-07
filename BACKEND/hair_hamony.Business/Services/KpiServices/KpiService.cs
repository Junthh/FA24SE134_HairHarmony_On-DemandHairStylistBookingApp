using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Kpis;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.KpiServices
{
    public class KpiService : IKpiService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public KpiService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetKpiModel> Create(CreateKpiModel requestBody)
        {
            var kpi = _mapper.Map<Kpi>(requestBody);
            kpi.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();
            kpi.UpdatedDate = UtilitiesHelper.DatetimeNowUTC7();

            await _context.Kpis.AddAsync(kpi);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetKpiModel>(kpi);
        }

        public async Task Delete(Guid id)
        {
            var kpi = _mapper.Map<Kpi>(await GetById(id));
            _context.Kpis.Remove(kpi);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetKpiModel>, int)> GetAll(PagingParam<KpiEnum.KpiSort> paginationModel, SearchKpiModel searchKpiModel)
        {
            var query = _context.Kpis.AsQueryable();
            query = query.GetWithSearch(searchKpiModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetKpiModel>>(query);

            return (results, total);
        }

        public async Task<GetKpiModel> GetById(Guid id)
        {
            var kpi = await _context.Kpis.AsNoTracking().FirstOrDefaultAsync(kpi => kpi.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetKpiModel>(kpi);
        }

        public async Task<GetKpiModel> Update(Guid id, UpdateKpiModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var kpi = _mapper.Map<Kpi>(await GetById(id));
            _mapper.Map(requestBody, kpi);
            kpi.UpdatedDate = UtilitiesHelper.DatetimeNowUTC7();

            _context.Kpis.Update(kpi);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetKpiModel>(kpi);
        }
    }
}
