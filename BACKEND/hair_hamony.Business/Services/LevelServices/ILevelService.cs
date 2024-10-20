using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Levels;

namespace hair_hamony.Business.Services.LevelServices
{
    public interface ILevelService
    {
        Task<(IList<GetLevelModel>, int)> GetAll(PagingParam<LevelEnum.LevelSort> paginationModel, SearchLevelModel searchLevelModel);
        Task<GetLevelModel> GetById(Guid id);
        Task<GetLevelModel> Create(CreateLevelModel requestBody);
        Task<GetLevelModel> Update(Guid id, UpdateLevelModel requestBody);
        Task Delete(Guid id);
    }
}
