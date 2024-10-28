using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.File;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Services;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.ServiceServices
{
    public class ServiceService : IServiceService
    {
        private readonly HairHamonyContext _context;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        public ServiceService(IFileService fileService, IMapper mapper)
        {
            _context = new HairHamonyContext();
            _fileService = fileService;
            _mapper = mapper;
        }

        public async Task<GetServiceModel> Create(CreateServiceModel requestBody)
        {
            var service = _mapper.Map<Service>(requestBody);
            service.CreatedDate = DateTime.Now;
            service.UpdatedDate = DateTime.Now;
            if (requestBody.Image != null)
            {
                var file = await _fileService.UploadFile(requestBody.Image);
                service.Image = file.Url;
            }

            await _context.Services.AddAsync(service);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetServiceModel>(service);
        }

        public async Task Delete(Guid id)
        {
            var service = _mapper.Map<Service>(await GetById(id));
            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetServiceModel>, int)> GetAll(PagingParam<ServiceEnum.ServiceSort> paginationModel, SearchServiceModel searchServiceModel)
        {
            var query = _context.Services.AsQueryable();
            query = query.GetWithSearch(searchServiceModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetServiceModel>>(query);

            return (results, total);
        }

        public async Task<GetServiceModel> GetById(Guid id)
        {
            var service = await _context.Services.AsNoTracking().FirstOrDefaultAsync(service => service.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetServiceModel>(service);
        }

        public async Task<GetServiceModel> Update(Guid id, UpdateServiceModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var service = _mapper.Map<Service>(await GetById(id));
            _mapper.Map(requestBody, service);
            service.UpdatedDate = DateTime.Now;
            if (requestBody.Image != null)
            {
                var file = await _fileService.UploadFile(requestBody.Image);
                service.Image = file.Url;
            }

            _context.Services.Update(service);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetServiceModel>(service);
        }
    }
}
