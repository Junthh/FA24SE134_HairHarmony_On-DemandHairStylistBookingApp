using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Transactions;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.TransactionServices
{
    public class TransactionService : ITransactionService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public TransactionService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetTransactionModel> Create(CreateTransactionModel requestBody)
        {
            var transaction = _mapper.Map<Transaction>(requestBody);
            transaction.CreatedDate = DateTime.Now;
            transaction.UpdatedDate = DateTime.Now;
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetTransactionModel>(transaction);
        }

        public async Task Delete(Guid id)
        {
            var transaction = _mapper.Map<Transaction>(await GetById(id));
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetTransactionModel>, int)> GetAll(PagingParam<TransactionEnum.TransactionSort> paginationModel, SearchTransactionModel searchTransactionModel)
        {
            var query = _context.Transactions.AsQueryable();
            query = query.GetWithSearch(searchTransactionModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetTransactionModel>>(query);

            return (results, total);
        }

        public async Task<GetTransactionModel> GetById(Guid id)
        {
            var transaction = await _context.Transactions.AsNoTracking().FirstOrDefaultAsync(transaction => transaction.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetTransactionModel>(transaction);
        }

        public async Task<GetTransactionModel> Update(Guid id, UpdateTransactionModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var transaction = _mapper.Map<Transaction>(await GetById(id));
            _mapper.Map(requestBody, transaction);
            transaction.UpdatedDate = DateTime.Now;

            _context.Transactions.Update(transaction);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetTransactionModel>(transaction);
        }
    }
}
