using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Categories;

namespace hair_hamony.Business.Services.CategoryServices
{
    public interface ICategoryService
    {
        Task<(IList<GetCategoryModel>, int)> GetAll(PagingParam<CategoryEnum.CategorySort> paginationModel, SearchCategoryModel searchCategoryModel);
        IList<GetCategoryOfComboAndServiceModel> GetCategoryOfComboAndService();
        Task<GetCategoryModel> GetById(Guid id);
        Task<GetCategoryModel> Create(CreateCategoryModel requestBody);
        Task<GetCategoryModel> Update(Guid id, UpdateCategoryModel requestBody);
        Task Delete(Guid id);
    }
}
