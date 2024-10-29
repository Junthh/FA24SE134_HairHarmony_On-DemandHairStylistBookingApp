using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.File;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.StylistServices
{
    public class StylistService : IStylistService
    {
        private readonly HairHamonyContext _context;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        private readonly IJwtHelper _jwtHelper;
        public StylistService(IFileService fileService, IMapper mapper, IJwtHelper jwtHelper)
        {
            _context = new HairHamonyContext();
            _fileService = fileService;
            _mapper = mapper;
            _jwtHelper = jwtHelper;
        }

        public async Task<GetStylistModel> Create(CreateStylistModel requestBody)
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

            var stylist = _mapper.Map<Stylist>(requestBody);

            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                stylist.Avatar = file.Url;
            }
            var defaultPassword = "123";
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(defaultPassword);
            stylist.Password = passwordHashed;
            stylist.Status = "Active";
            stylist.CreatedDate = DateTime.Now;

            await _context.Stylists.AddAsync(stylist);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistModel>(stylist);
        }

        public async Task Delete(Guid id)
        {
            var stylist = _mapper.Map<Stylist>(await GetById(id));
            _context.Stylists.Remove(stylist);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetDetailStylistModel>, int)> GetAll(PagingParam<StylistEnum.StylistSort> paginationModel, SearchStylistModel searchStylistModel)
        {
            var query = _context.Stylists.AsQueryable();
            query = query.GetWithSearch(searchStylistModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetDetailStylistModel>>(query);

            return (results, total);
        }

        public async Task<GetStylistModel> GetById(Guid id)
        {
            var stylist = await _context.Stylists.AsNoTracking().FirstOrDefaultAsync(stylist => stylist.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetStylistModel>(stylist);
        }

        public async Task<GetStylistModel> Update(Guid id, UpdateStylistModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }

            var stylist = _mapper.Map<Stylist>(await GetById(id));
            if (stylist.Username != requestBody.Username)
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

            _mapper.Map(requestBody, stylist);
            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                stylist.Avatar = file.Url;
            }

            _context.Stylists.Update(stylist);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistModel>(stylist);
        }

        public async Task<(string token, GetStylistModel stylist)> Login(UserLoginModel requestBody)
        {
            var stylist = await _context.Stylists.FirstOrDefaultAsync(stylist => requestBody.Username == stylist.Username)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(requestBody.Password, stylist.Password);
            if (!isValidPassword)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };
            }

            var token = _jwtHelper.GenerateJwtToken(role: "Stylist", id: stylist.Id, email: "", phoneNumber: stylist.PhoneNumber, username: stylist.Username);
            return (token, _mapper.Map<GetStylistModel>(stylist));
        }

        public async Task<GetStylistModel> ChangePassword(Guid id, string oldPassword, string newPassword)
        {
            var stylist = await _context.Stylists.FirstOrDefaultAsync(stylist => stylist.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tài khoản không tồn tại"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(oldPassword, stylist.Password);
            if (!isValidPassword)
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Mật khẩu cũ không chính xác"
                };

            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(newPassword);
            stylist.Password = passwordHashed;

            _context.Stylists.Update(stylist);
            await _context.SaveChangesAsync();
            return _mapper.Map<GetStylistModel>(stylist);
        }

        private async Task<bool> UsernameIsExisted(string username)
        {
            var isExisted = await _context.Stylists.Where(stylist => stylist.Username == username).AnyAsync();

            return isExisted;
        }
    }
}
