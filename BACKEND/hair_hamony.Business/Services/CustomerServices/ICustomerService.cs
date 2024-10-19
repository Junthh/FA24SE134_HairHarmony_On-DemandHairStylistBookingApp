using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Customers;

namespace hair_hamony.Business.Services.CustomerServices
{
    public interface ICustomerService
    {
        Task<(IList<GetCustomerModel>, int)> GetAll(PagingParam<CustomerEnum.CustomerSort> paginationModel, SearchCustomerModel searchCustomerModel);
        Task<GetCustomerModel> GetById(Guid id);
        Task<GetCustomerModel> Create(CreateCustomerModel requestBody);
        Task<GetCustomerModel> Update(Guid id, UpdateCustomerModel requestBody);
        Task Delete(Guid id);
    }
}
