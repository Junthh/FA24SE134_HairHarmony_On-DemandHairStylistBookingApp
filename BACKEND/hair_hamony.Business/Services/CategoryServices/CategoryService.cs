using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.File;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Categories;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.CategoryServices
{
    public class CategoryService : ICategoryService
    {
        private readonly HairHamonyContext _context;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        public CategoryService(IFileService fileService, IMapper mapper)
        {
            _context = new HairHamonyContext();
            _fileService = fileService;
            _mapper = mapper;
        }

        public async Task<GetCategoryModel> Create(CreateCategoryModel requestBody)
        {
            var category = _mapper.Map<Category>(requestBody);
            category.CreatedDate = DateTime.Now;
            category.UpdatedDate = DateTime.Now;

            if (requestBody.Image != null)
            {
                var file = await _fileService.UploadFile(requestBody.Image);
                category.Image = file.Url;
            }

            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetCategoryModel>(category);
        }

        public async Task Delete(Guid id)
        {
            var category = _mapper.Map<Category>(await GetById(id));
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetCategoryModel>, int)> GetAll(PagingParam<CategoryEnum.CategorySort> paginationModel, SearchCategoryModel searchCategoryModel)
        {
            var query = _context.Categories.AsQueryable();
            query = query.GetWithSearch(searchCategoryModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetCategoryModel>>(query);

            return (results, total);
        }

        public IList<GetCategoryOfComboAndServiceModel> GetCategoryOfComboAndService()
        {
            var categorys = _context.Categories.ToList();

            var results = new List<GetCategoryOfComboAndServiceModel>();
            foreach (var category in categorys)
            {
                var services = new List<GetCategoryOfComboAndServiceModel.ServiceModel>();

                var listService = _context.Services.Where(service => service.CategoryId == category.Id).ToList();
                if (listService.Any())
                {
                    foreach (var item in listService)
                    {
                        services.Add(new GetCategoryOfComboAndServiceModel.ServiceModel
                        {
                            CategoryId = item.CategoryId,
                            CreatedDate = item.CreatedDate,
                            Description = item.Description,
                            Duration = item.Duration,
                            Id = item.Id,
                            Name = item.Name,
                            Image = item.Image,
                            Price = item.Price,
                            UpdatedDate = item.UpdatedDate,
                        });
                    }
                }

                var listCombo = _context.Combos.Where(combo => combo.CategoryId == category.Id).ToList();
                if (listCombo.Any())
                {
                    foreach (var item in listCombo)
                    {
                        services.Add(new GetCategoryOfComboAndServiceModel.ServiceModel
                        {
                            CategoryId = item.CategoryId,
                            CreatedDate = item.CreatedDate,
                            Description = item.Description,
                            Duration = item.Duration,
                            Id = item.Id,
                            Name = item.Name,
                            Image = item.Image,
                            Price = item.TotalPrice,
                            Discount = item.Discount,
                            UpdatedDate = item.UpdatedDate,
                        });
                    }
                }

                results.Add(new GetCategoryOfComboAndServiceModel
                {
                    CreatedDate = category.CreatedDate,
                    Id = category.Id,
                    Name = category.Name,
                    Image = category.Image,
                    UpdatedDate = category.UpdatedDate,
                    Services = services
                });
            }

            return results;
        }

        public async Task<GetCategoryModel> GetById(Guid id)
        {
            var category = await _context.Categories.AsNoTracking().FirstOrDefaultAsync(category => category.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetCategoryModel>(category);
        }

        public async Task<GetCategoryModel> Update(Guid id, UpdateCategoryModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var category = _mapper.Map<Category>(await GetById(id));
            _mapper.Map(requestBody, category);
            if (requestBody.Image != null)
            {
                var file = await _fileService.UploadFile(requestBody.Image);
                category.Image = file.Url;
            }
            category.UpdatedDate = DateTime.Now;

            _context.Categories.Update(category);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetCategoryModel>(category);
        }
    }
}
