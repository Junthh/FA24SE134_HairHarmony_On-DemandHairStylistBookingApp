using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Payments;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.PaymentServices
{
    public class PaymentService : IPaymentService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public PaymentService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetPaymentModel> Create(CreatePaymentModel requestBody)
        {
            var payment = _mapper.Map<Payment>(requestBody);
            payment.CreatedDate = DateTime.Now;

            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetPaymentModel>(payment);
        }

        public async Task Delete(Guid id)
        {
            var payment = _mapper.Map<Payment>(await GetById(id));
            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetPaymentModel>, int)> GetAll(PagingParam<PaymentEnum.PaymentSort> paginationModel, SearchPaymentModel searchPaymentModel)
        {
            var query = _context.Payments.AsQueryable();
            query = query.GetWithSearch(searchPaymentModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetPaymentModel>>(query);

            return (results, total);
        }

        public async Task<GetPaymentModel> GetById(Guid id)
        {
            var payment = await _context.Payments.AsNoTracking().FirstOrDefaultAsync(payment => payment.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetPaymentModel>(payment);
        }

        public async Task<GetPaymentModel> Update(Guid id, UpdatePaymentModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var payment = _mapper.Map<Payment>(await GetById(id));
            _mapper.Map(requestBody, payment);
            _context.Payments.Update(payment);

            await _context.SaveChangesAsync();

            return _mapper.Map<GetPaymentModel>(payment);
        }
    }
}
