using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.File;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Owners;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.OwnerServices
{
    public class OwnerService : IOwnerService
    {
        private readonly HairHamonyContext _context;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        private readonly IJwtHelper _jwtHelper;
        public OwnerService(IFileService fileService, IMapper mapper, IJwtHelper jwtHelper)
        {
            _context = new HairHamonyContext();
            _fileService = fileService;
            _mapper = mapper;
            _jwtHelper = jwtHelper;
        }

        public async Task<GetOwnerModel> Create(CreateOwnerModel requestBody)
        {
            var isExistedUsername = await UsernameIsExisted(requestBody.Username);
            if (isExistedUsername)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên đăng nhập đã tồn tại"
                };
            }

            var owner = _mapper.Map<Owner>(requestBody);

            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                owner.Avatar = file.Url;
            }
            var defaultPassword = "123";
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(defaultPassword);
            owner.Password = passwordHashed;
            owner.Status = "Active";
            owner.CreatedDate = DateTime.Now;

            await _context.Owners.AddAsync(owner);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetOwnerModel>(owner);
        }

        public async Task Delete(Guid id)
        {
            var owner = _mapper.Map<Owner>(await GetById(id));
            _context.Owners.Remove(owner);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetOwnerModel>, int)> GetAll(PagingParam<OwnerEnum.OwnerSort> paginationModel, SearchOwnerModel searchOwnerModel)
        {
            var query = _context.Owners.AsQueryable();
            query = query.GetWithSearch(searchOwnerModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetOwnerModel>>(query);

            return (results, total);
        }

        public async Task<GetOwnerModel> GetById(Guid id)
        {
            var owner = await _context.Owners.AsNoTracking().FirstOrDefaultAsync(owner => owner.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetOwnerModel>(owner);
        }

        public async Task<GetOwnerModel> Update(Guid id, UpdateOwnerModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }

            var owner = _mapper.Map<Owner>(await GetById(id));
            if (owner.Username != requestBody.Username)
            {
                var isExistedUsername = await UsernameIsExisted(requestBody.Username);
                if (isExistedUsername)
                {
                    throw new CException
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        ErrorMessage = "Tên đăng nhập đã tồn tại"
                    };
                }
            }
            _mapper.Map(requestBody, owner);
            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                owner.Avatar = file.Url;
            }

            _context.Owners.Update(owner);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetOwnerModel>(owner);
        }

        public async Task<(string token, GetOwnerModel owner)> Login(UserLoginModel requestBody)
        {
            var owner = await _context.Owners.FirstOrDefaultAsync(owner => requestBody.Username == owner.Username)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(requestBody.Password, owner.Password);
            if (!isValidPassword)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };
            }

            var token = _jwtHelper.GenerateJwtToken(role: "Owner", id: owner.Id, email: "", phoneNumber: owner.PhoneNumber, username: owner.Username);
            return (token, _mapper.Map<GetOwnerModel>(owner));
        }

        public async Task<GetOwnerModel> ChangePassword(Guid id, string oldPassword, string newPassword)
        {
            var owner = await _context.Owners.FirstOrDefaultAsync(owner => owner.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tài khoản không tồn tại"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(oldPassword, owner.Password);
            if (!isValidPassword)
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Mật khẩu cũ không chính xác"
                };

            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(newPassword);
            owner.Password = passwordHashed;

            _context.Owners.Update(owner);
            await _context.SaveChangesAsync();
            return _mapper.Map<GetOwnerModel>(owner);
        }

        private async Task<bool> UsernameIsExisted(string username)
        {
            var isExisted = await _context.Owners.Where(owner => owner.Username == username).AnyAsync();

            return isExisted;
        }
    }
}
