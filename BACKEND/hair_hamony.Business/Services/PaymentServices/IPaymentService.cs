using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.Payments;

namespace hair_hamony.Business.Services.PaymentServices
{
    public interface IPaymentService
    {
        Task<(IList<GetPaymentModel>, int)> GetAll(PagingParam<PaymentEnum.PaymentSort> paginationModel, SearchPaymentModel searchPaymentModel);
        Task<GetPaymentModel> GetById(Guid id);
        Task<GetPaymentModel> Create(CreatePaymentModel requestBody);
        Task<GetPaymentModel> Update(Guid id, UpdatePaymentModel requestBody);
        Task Delete(Guid id);
    }
}
