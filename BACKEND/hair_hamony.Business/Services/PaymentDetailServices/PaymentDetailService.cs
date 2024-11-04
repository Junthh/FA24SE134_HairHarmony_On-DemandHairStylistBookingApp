using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.PaymentDetails;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.PaymentDetailServices
{
    public class PaymentDetailService : IPaymentDetailService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public PaymentDetailService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetPaymentDetailModel> Create(CreatePaymentDetailModel requestBody)
        {
            var paymentDetail = _mapper.Map<PaymentDetail>(requestBody);
            paymentDetail.CreatedDate = DateTime.Now;

            await _context.PaymentDetails.AddAsync(paymentDetail);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetPaymentDetailModel>(paymentDetail);
        }

        public async Task Delete(Guid id)
        {
            var paymentDetail = _mapper.Map<PaymentDetail>(await GetById(id));
            _context.PaymentDetails.Remove(paymentDetail);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetPaymentDetailModel>, int)> GetAll(PagingParam<PaymentDetailEnum.PaymentDetailSort> paginationModel, SearchPaymentDetailModel searchPaymentDetailModel)
        {
            var query = _context.PaymentDetails.AsQueryable();
            query = query.GetWithSearch(searchPaymentDetailModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetPaymentDetailModel>>(query);

            return (results, total);
        }

        public async Task<GetPaymentDetailModel> GetById(Guid id)
        {
            var paymentDetail = await _context.PaymentDetails.AsNoTracking().FirstOrDefaultAsync(paymentDetail => paymentDetail.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetPaymentDetailModel>(paymentDetail);
        }

        public async Task<GetPaymentDetailModel> Update(Guid id, UpdatePaymentDetailModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var paymentDetail = _mapper.Map<PaymentDetail>(await GetById(id));
            _mapper.Map(requestBody, paymentDetail);

            _context.PaymentDetails.Update(paymentDetail);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetPaymentDetailModel>(paymentDetail);
        }
    }
}
