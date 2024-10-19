using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.News;

namespace hair_hamony.Business.Services.NewsServices
{
    public interface INewsService
    {
        Task<(IList<GetNewsModel>, int)> GetAll(PagingParam<NewsEnum.NewsSort> paginationModel, SearchNewsModel searchNewsModel);
        Task<GetNewsModel> GetById(Guid id);
        Task<GetNewsModel> Create(CreateNewsModel requestBody);
        Task<GetNewsModel> Update(Guid id, UpdateNewsModel requestBody);
        Task Delete(Guid id);
    }
}
