using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.ViewModels.PaymentDetails;

namespace hair_hamony.Business.Services.PaymentDetailServices
{
    public interface IPaymentDetailService
    {
        Task<(IList<GetPaymentDetailModel>, int)> GetAll(PagingParam<PaymentDetailEnum.PaymentDetailSort> paginationModel, SearchPaymentDetailModel searchPaymentDetailModel);
        Task<GetPaymentDetailModel> GetById(Guid id);
        Task<GetPaymentDetailModel> Create(CreatePaymentDetailModel requestBody);
        Task<GetPaymentDetailModel> Update(Guid id, UpdatePaymentDetailModel requestBody);
        Task Delete(Guid id);
    }
}
