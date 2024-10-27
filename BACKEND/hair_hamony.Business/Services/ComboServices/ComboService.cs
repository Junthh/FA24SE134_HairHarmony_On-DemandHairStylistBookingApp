using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.File;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Combos;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.ComboServices
{
    public class ComboService : IComboService
    {
        private readonly HairHamonyContext _context;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        public ComboService(IFileService fileService, IMapper mapper)
        {
            _context = new HairHamonyContext();
            _fileService = fileService;
            _mapper = mapper;
        }

        public async Task<GetComboModel> Create(CreateComboModel requestBody)
        {
            var combo = _mapper.Map<Combo>(requestBody);
            combo.CreatedDate = DateTime.Now;
            combo.UpdatedDate = DateTime.Now;
            if (requestBody.Image != null)
            {
                var file = await _fileService.UploadFile(requestBody.Image);
                combo.Image = file.Url;
            }

            await _context.Combos.AddAsync(combo);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetComboModel>(combo);
        }

        public async Task Delete(Guid id)
        {
            var combo = _mapper.Map<Combo>(await GetById(id));
            _context.Combos.Remove(combo);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetComboModel>, int)> GetAll(PagingParam<ComboEnum.ComboSort> paginationModel, SearchComboModel searchComboModel)
        {
            var query = _context.Combos.AsQueryable();
            query = query.GetWithSearch(searchComboModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetComboModel>>(query);

            return (results, total);
        }

        public async Task<GetComboModel> GetById(Guid id)
        {
            var combo = await _context.Combos.AsNoTracking().FirstOrDefaultAsync(combo => combo.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetComboModel>(combo);
        }

        public async Task<GetComboModel> Update(Guid id, UpdateComboModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var combo = _mapper.Map<Combo>(await GetById(id));
            _mapper.Map(requestBody, combo);
            combo.UpdatedDate = DateTime.Now;
            if (requestBody.Image != null)
            {
                var file = await _fileService.UploadFile(requestBody.Image);
                combo.Image = file.Url;
            }

            _context.Combos.Update(combo);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetComboModel>(combo);
        }
    }
}
