using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.TransactionDetails;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.TransactionDetailServices
{
    public class TransactionDetailService : ITransactionDetailService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public TransactionDetailService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetTransactionDetailModel> Create(CreateTransactionDetailModel requestBody)
        {
            var transactionDetail = _mapper.Map<TransactionDetail>(requestBody);
            transactionDetail.CreatedDate = DateTime.Now;

            await _context.TransactionDetails.AddAsync(transactionDetail);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetTransactionDetailModel>(transactionDetail);
        }

        public async Task Delete(Guid id)
        {
            var transactionDetail = _mapper.Map<TransactionDetail>(await GetById(id));
            _context.TransactionDetails.Remove(transactionDetail);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetTransactionDetailModel>, int)> GetAll(PagingParam<TransactionDetailEnum.TransactionDetailSort> paginationModel, SearchTransactionDetailModel searchTransactionDetailModel)
        {
            var query = _context.TransactionDetails.AsQueryable();
            query = query.GetWithSearch(searchTransactionDetailModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetTransactionDetailModel>>(query);

            return (results, total);
        }

        public async Task<GetTransactionDetailModel> GetById(Guid id)
        {
            var transactionDetail = await _context.TransactionDetails.AsNoTracking().FirstOrDefaultAsync(transactionDetail => transactionDetail.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetTransactionDetailModel>(transactionDetail);
        }

        public async Task<GetTransactionDetailModel> Update(Guid id, UpdateTransactionDetailModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var transactionDetail = _mapper.Map<TransactionDetail>(await GetById(id));
            _mapper.Map(requestBody, transactionDetail);

            _context.TransactionDetails.Update(transactionDetail);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetTransactionDetailModel>(transactionDetail);
        }
    }
}
