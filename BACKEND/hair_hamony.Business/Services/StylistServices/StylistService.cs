using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.StylistServices
{
    public class StylistService : IStylistService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public StylistService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetStylistModel> Create(CreateStylistModel requestBody)
        {
            var stylist = _mapper.Map<Stylist>(requestBody);
            stylist.CreatedDate = DateTime.Now;
            await _context.Stylists.AddAsync(stylist);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistModel>(stylist);
        }

        public async Task Delete(Guid id)
        {
            var stylist = _mapper.Map<Stylist>(await GetById(id));
            _context.Stylists.Remove(stylist);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetStylistModel>, int)> GetAll(PagingParam<StylistEnum.StylistSort> paginationModel, SearchStylistModel searchStylistModel)
        {
            var query = _context.Stylists.AsQueryable();
            query = query.GetWithSearch(searchStylistModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetStylistModel>>(query);

            return (results, total);
        }

        public async Task<GetStylistModel> GetById(Guid id)
        {
            var stylist = await _context.Stylists.AsNoTracking().FirstOrDefaultAsync(stylist => stylist.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetStylistModel>(stylist);
        }

        public async Task<GetStylistModel> Update(Guid id, UpdateStylistModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var stylist = _mapper.Map<Stylist>(await GetById(id));
            _context.Stylists.Update(stylist);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistModel>(stylist);
        }
    }
}
