using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.File;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Customers;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.CustomerServices
{
    public class CustomerService : ICustomerService
    {
        private readonly HairHamonyContext _context;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        private readonly IJwtHelper _jwtHelper;
        public CustomerService(IFileService fileService, IMapper mapper, IJwtHelper jwtHelper)
        {
            _context = new HairHamonyContext();
            _fileService = fileService;
            _mapper = mapper;
            _jwtHelper = jwtHelper;
        }

        public async Task<GetCustomerModel> Create(CreateCustomerModel requestBody)
        {
            var customer = _mapper.Map<Customer>(requestBody);

            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                customer.Avatar = file.Url;
            }
            var defaultPassword = "123";
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(defaultPassword);
            customer.Password = passwordHashed;
            customer.Status = "Active";
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

            _mapper.Map(requestBody, customer);
            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                customer.Avatar = file.Url;
            }

            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetCustomerModel>(customer);
        }

        public async Task<(string token, GetCustomerModel customer)> Login(UserLoginModel requestBody)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(customer => requestBody.Username == customer.Username)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(requestBody.Password, customer.Password);
            if (!isValidPassword)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };
            }

            var token = _jwtHelper.GenerateJwtToken(role: "Staff", id: customer.Id, email: "", phoneNumber: customer.PhoneNumber, username: customer.Username);
            return (token, _mapper.Map<GetCustomerModel>(customer));
        }

        public async Task<GetCustomerModel> ChangePassword(Guid id, string oldPassword, string newPassword)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(customer => customer.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tài khoản không tồn tại"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(oldPassword, customer.Password);
            if (!isValidPassword)
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Mật khẩu cũ không chính xác"
                };

            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(newPassword);
            customer.Password = passwordHashed;

            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();
            return _mapper.Map<GetCustomerModel>(customer);
        }
    }
}
