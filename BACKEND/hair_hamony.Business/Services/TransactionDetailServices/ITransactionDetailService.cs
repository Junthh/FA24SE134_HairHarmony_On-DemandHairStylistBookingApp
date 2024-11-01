using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.TransactionDetails;

namespace hair_hamony.Business.Services.TransactionDetailServices
{
    public interface ITransactionDetailService
    {
        Task<(IList<GetTransactionDetailModel>, int)> GetAll(PagingParam<TransactionDetailEnum.TransactionDetailSort> paginationModel, SearchTransactionDetailModel searchTransactionDetailModel);
        Task<GetTransactionDetailModel> GetById(Guid id);
        Task<GetTransactionDetailModel> Create(CreateTransactionDetailModel requestBody);
        Task<GetTransactionDetailModel> Update(Guid id, UpdateTransactionDetailModel requestBody);
        Task Delete(Guid id);
    }
}
