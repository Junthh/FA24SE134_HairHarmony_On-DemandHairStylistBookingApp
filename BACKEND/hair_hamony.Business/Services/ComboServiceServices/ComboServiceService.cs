using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.ComboServices;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.ComboServiceServices
{
    public class ComboServiceService : IComboServiceService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public ComboServiceService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetComboServiceModel> Create(CreateComboServiceModel requestBody)
        {
            var comboService = _mapper.Map<ComboService>(requestBody);
            comboService.CreatedDate = DateTime.Now;
            comboService.UpdatedDate = DateTime.Now;

            await _context.ComboServices.AddAsync(comboService);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetComboServiceModel>(comboService);
        }

        public async Task Delete(Guid id)
        {
            var comboService = _mapper.Map<ComboService>(await GetById(id));
            _context.ComboServices.Remove(comboService);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetComboServiceModel>, int)> GetAll(PagingParam<ComboServiceEnum.ComboServiceSort> paginationModel, SearchComboServiceModel searchComboServiceModel)
        {
            var query = _context.ComboServices.AsQueryable();
            query = query.GetWithSearch(searchComboServiceModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetComboServiceModel>>(query);

            return (results, total);
        }

        public async Task<GetComboServiceModel> GetById(Guid id)
        {
            var comboService = await _context.ComboServices.AsNoTracking().FirstOrDefaultAsync(comboService => comboService.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetComboServiceModel>(comboService);
        }

        public async Task<GetComboServiceModel> Update(Guid id, UpdateComboServiceModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var comboService = _mapper.Map<ComboService>(await GetById(id));
            _mapper.Map(requestBody, comboService);
            comboService.UpdatedDate = DateTime.Now;

            _context.ComboServices.Update(comboService);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetComboServiceModel>(comboService);
        }
    }
}
