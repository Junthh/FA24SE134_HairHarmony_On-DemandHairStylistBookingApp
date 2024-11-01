using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Transactions;

namespace hair_hamony.Business.Services.TransactionServices
{
    public interface ITransactionService
    {
        Task<(IList<GetTransactionModel>, int)> GetAll(PagingParam<TransactionEnum.TransactionSort> paginationModel, SearchTransactionModel searchTransactionModel);
        Task<GetTransactionModel> GetById(Guid id);
        Task<GetTransactionModel> Create(CreateTransactionModel requestBody);
        Task<GetTransactionModel> Update(Guid id, UpdateTransactionModel requestBody);
        Task Delete(Guid id);
    }
}
