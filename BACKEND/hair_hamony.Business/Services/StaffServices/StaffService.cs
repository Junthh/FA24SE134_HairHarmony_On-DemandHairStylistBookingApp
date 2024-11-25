using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.File;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Staffs;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.StaffServices
{
    public class StaffService : IStaffService
    {
        private readonly HairHamonyContext _context;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        private readonly IJwtHelper _jwtHelper;
        public StaffService(IFileService fileService, IMapper mapper, IJwtHelper jwtHelper)
        {
            _context = new HairHamonyContext();
            _fileService = fileService;
            _mapper = mapper;
            _jwtHelper = jwtHelper;
        }

        public async Task<GetStaffModel> Create(CreateStaffModel requestBody)
        {
            var isUsernameExisted = await IsUsernameExisted(requestBody.Username);
            if (isUsernameExisted)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên đăng nhập đã tồn tại"
                };
            }
            var isPhoneNumberExisted = await IsPhoneNumberExisted(requestBody.PhoneNumber);
            if (isPhoneNumberExisted)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Số điện thoại đã tồn tại"
                };
            }

            var staff = _mapper.Map<Staff>(requestBody);

            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                staff.Avatar = file.Url;
            }
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(requestBody.Password);
            staff.Password = passwordHashed;
            staff.Status = "Active";
            staff.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();

            await _context.Staffs.AddAsync(staff);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStaffModel>(staff);
        }

        public async Task Delete(Guid id)
        {
            var staff = _mapper.Map<Staff>(await GetById(id));
            _context.Staffs.Remove(staff);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetStaffModel>, int)> GetAll(PagingParam<StaffEnum.StaffSort> paginationModel, SearchStaffModel searchStaffModel)
        {
            var query = _context.Staffs.AsQueryable();
            query = query.GetWithSearch(searchStaffModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetStaffModel>>(query);

            return (results, total);
        }

        public async Task<GetStaffModel> GetById(Guid id)
        {
            var staff = await _context.Staffs.AsNoTracking().FirstOrDefaultAsync(staff => staff.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetStaffModel>(staff);
        }

        public async Task<GetStaffModel> Update(Guid id, UpdateStaffModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }

            var staff = _mapper.Map<Staff>(await GetById(id));
            if (staff.Username != requestBody.Username)
            {
                var isExisted = await IsUsernameExisted(requestBody.Username);
                if (isExisted)
                {
                    throw new CException
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        ErrorMessage = "Tên đăng nhập đã tồn tại"
                    };
                }
            }
            if (staff.PhoneNumber != requestBody.PhoneNumber)
            {
                var isExisted = await IsPhoneNumberExisted(requestBody.PhoneNumber);
                if (isExisted)
                {
                    throw new CException
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        ErrorMessage = "Số điện thoại đã tồn tại"
                    };
                }
            }
            var oldAvatar = staff.Avatar;
            _mapper.Map(requestBody, staff);
            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                staff.Avatar = file.Url;
            }
            else
            {
                staff.Avatar = oldAvatar;
            }

            _context.Staffs.Update(staff);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStaffModel>(staff);
        }

        public async Task<(string token, GetStaffModel staff)> Login(UserLoginModel requestBody)
        {
            var staff = await _context.Staffs.FirstOrDefaultAsync(staff => requestBody.Username == staff.Username)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(requestBody.Password, staff.Password);
            if (!isValidPassword)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };
            }

            var token = _jwtHelper.GenerateJwtToken(
                role: "Staff",
                id: staff.Id,
                email: "",
                phoneNumber: staff.PhoneNumber,
                username: staff.Username,
                fullName: staff.FullName
            );
            return (token, _mapper.Map<GetStaffModel>(staff));
        }

        public async Task<GetStaffModel> ChangePassword(Guid id, string oldPassword, string newPassword)
        {
            var staff = await _context.Staffs.FirstOrDefaultAsync(staff => staff.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tài khoản không tồn tại"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(oldPassword, staff.Password);
            if (!isValidPassword)
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Mật khẩu cũ không chính xác"
                };

            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(newPassword);
            staff.Password = passwordHashed;

            _context.Staffs.Update(staff);
            await _context.SaveChangesAsync();
            return _mapper.Map<GetStaffModel>(staff);
        }

        private async Task<bool> IsUsernameExisted(string username)
        {
            var isExisted = await _context.Staffs.Where(staff => staff.Username == username).AnyAsync();

            return isExisted;
        }

        private async Task<bool> IsPhoneNumberExisted(string phoneNumber)
        {
            var isExisted = await _context.Staffs.Where(staff => staff.PhoneNumber == phoneNumber).AnyAsync();

            return isExisted;
        }
    }
}
