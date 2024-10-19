using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Customers;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.CustomerServices
{
    public class CustomerService : ICustomerService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public CustomerService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetCustomerModel> Create(CreateCustomerModel requestBody)
        {
            var customer = _mapper.Map<Customer>(requestBody);
            customer.CreatedDate = DateTime.Now;
            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetCustomerModel>(customer);
        }

        public async Task Delete(Guid id)
        {
            var customer = _mapper.Map<Customer>(await GetById(id));
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetCustomerModel>, int)> GetAll(PagingParam<CustomerEnum.CustomerSort> paginationModel, SearchCustomerModel searchCustomerModel)
        {
            var query = _context.Customers.AsQueryable();
            query = query.GetWithSearch(searchCustomerModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetCustomerModel>>(query);

            return (results, total);
        }

        public async Task<GetCustomerModel> GetById(Guid id)
        {
            var customer = await _context.Customers.AsNoTracking().FirstOrDefaultAsync(customer => customer.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetCustomerModel>(customer);
        }

        public async Task<GetCustomerModel> Update(Guid id, UpdateCustomerModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var customer = _mapper.Map<Customer>(await GetById(id));
            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetCustomerModel>(customer);
        }
    }
}
