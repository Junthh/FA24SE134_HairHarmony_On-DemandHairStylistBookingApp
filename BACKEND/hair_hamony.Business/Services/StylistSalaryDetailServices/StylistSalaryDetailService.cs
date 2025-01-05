using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.StylistSalaryDetails;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.StylistSalaryDetailServices
{
    public class StylistSalaryDetailService : IStylistSalaryDetailService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public StylistSalaryDetailService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetStylistSalaryDetailModel> Create(CreateStylistSalaryDetailModel requestBody)
        {
            var stylistSalaryDetail = _mapper.Map<StylistSalaryDetail>(requestBody);
            stylistSalaryDetail.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();

            await _context.StylistSalaryDetails.AddAsync(stylistSalaryDetail);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistSalaryDetailModel>(stylistSalaryDetail);
        }

        public async Task Delete(Guid id)
        {
            var stylistSalaryDetail = _mapper.Map<StylistSalaryDetail>(await GetById(id));
            _context.StylistSalaryDetails.Remove(stylistSalaryDetail);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetDetailStylistSalaryDetailModel>, int)> GetAll(PagingParam<StylistSalaryDetailEnum.StylistSalaryDetailSort> paginationModel,
            SearchStylistSalaryDetailModel searchStylistSalaryDetailModel)
        {
            var query = _context.StylistSalaryDetails
                .Include(x => x.Booking)
                .ThenInclude(booking => booking.Customer)
                .AsQueryable();
            query = query.GetWithSearch(searchStylistSalaryDetailModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetDetailStylistSalaryDetailModel>>(query);

            return (results, total);
        }

        public async Task<GetStylistSalaryDetailModel> GetById(Guid id)
        {
            var stylistSalaryDetail = await _context.StylistSalaryDetails.AsNoTracking().FirstOrDefaultAsync(stylistSalaryDetail => stylistSalaryDetail.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetStylistSalaryDetailModel>(stylistSalaryDetail);
        }

        public async Task<GetStylistSalaryDetailModel> Update(Guid id, UpdateStylistSalaryDetailModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var stylistSalaryDetail = _mapper.Map<StylistSalaryDetail>(await GetById(id));
            _mapper.Map(requestBody, stylistSalaryDetail);

            _context.StylistSalaryDetails.Update(stylistSalaryDetail);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistSalaryDetailModel>(stylistSalaryDetail);
        }
    }
}
