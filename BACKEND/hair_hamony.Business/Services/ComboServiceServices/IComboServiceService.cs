﻿using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.ComboServices;

namespace hair_hamony.Business.Services.ComboServiceServices
{
    public interface IComboServiceService
    {
        Task<(IList<GetComboServiceModel>, int)> GetAll(PagingParam<ComboServiceEnum.ComboServiceSort> paginationModel, SearchComboServiceModel searchComboServiceModel);
        Task<GetComboServiceModel> GetById(Guid id);
        Task<GetComboServiceModel> Create(CreateComboServiceModel requestBody);
        Task<GetComboServiceModel> Update(Guid id, UpdateComboServiceModel requestBody);
        Task Delete(Guid id);
    }
}
