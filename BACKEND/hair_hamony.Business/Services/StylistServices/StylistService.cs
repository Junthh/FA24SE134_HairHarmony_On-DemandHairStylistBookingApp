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

            var stylist = _mapper.Map<Stylist>(requestBody);

            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                stylist.Avatar = file.Url;
            }
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(requestBody.Password);
            stylist.Password = passwordHashed;
            stylist.Status = "Active";
            stylist.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();
            stylist.Rating = 5;
            stylist.Id = Guid.NewGuid();

            //var monthCurrent = UtilitiesHelper.DatetimeNowUTC7().Month;
            //var yearCurrent = UtilitiesHelper.DatetimeNowUTC7().Year;
            //var kpi = _context.Kpis.FirstOrDefault(x =>
            //                    x.StartDate <= DateOnly.FromDateTime(UtilitiesHelper.DatetimeNowUTC7())
            //                    && x.EndDate >= DateOnly.FromDateTime(UtilitiesHelper.DatetimeNowUTC7())
            //                );
            //var totalKpi = kpi.Value + stylist.Kpi;
            //await _context.StylistSalarys.AddAsync(new StylistSalary
            //{
            //    CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
            //    Month = monthCurrent,
            //    Year = yearCurrent,
            //    StylistId = stylist.Id,
            //    TotalBooking = 0,
            //    TotalCommission = 0,
            //    TotalSalary = 0,
            //    Kpi = totalKpi,
            //});

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

        public async Task<GetDetailStylistModel> GetById(Guid id)
        {
            var stylist = await _context.Stylists.AsNoTracking()
                .Include(stylist => stylist.BookingSlotStylists)
                .Include(stylist => stylist.Feedbacks)
                .ThenInclude(feedback => feedback.Booking)
                .ThenInclude(booking => booking.Customer)
                .FirstOrDefaultAsync(stylist => stylist.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetDetailStylistModel>(stylist);
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

            var stylist = _context.Stylists.AsNoTracking().FirstOrDefault(x => x.Id == requestBody.Id);
            if (stylist.Username != requestBody.Username)
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
            if (stylist.PhoneNumber != requestBody.PhoneNumber)
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
            if (requestBody.Status != stylist.Status && requestBody.Status == "Inactive")
            {
                var isExistedBooking = await _context.BookingSlotStylists
                    .AsNoTracking()
                    .AnyAsync(x =>
                        (x.BookingDetail.Booking.Status == "Cancel" || x.BookingDetail.Booking.Status == "Finished") &&
                        x.StylistId == requestBody.Id
                    );
                if (isExistedBooking)
                {
                    throw new CException
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        ErrorMessage = "Bạn đang có lịch cắt tóc nên không khoá tài khoản được, vui lòng hoàn thành lịch cắt tóc trước khi khoá tài khoản"
                    };
                }
            }

            var oldAvatar = stylist.Avatar;
            _mapper.Map(requestBody, stylist);
            if (requestBody.Avatar != null)
            {
                var file = await _fileService.UploadFile(requestBody.Avatar);
                stylist.Avatar = file.Url;
            }
            else
            {
                stylist.Avatar = oldAvatar;
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

            if (stylist.Status == "Inactive")
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tài khoản đã bị khoá"
                };
            }

            var token = _jwtHelper.GenerateJwtToken(
                role: "Stylist",
                id: stylist.Id,
                email: "",
                phoneNumber: stylist.PhoneNumber,
                username: stylist.Username,
                fullName: stylist.FullName
            );
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

        private async Task<bool> IsUsernameExisted(string username)
        {
            var isExisted = await _context.Stylists.Where(stylist => stylist.Username == username).AnyAsync();

            return isExisted;
        }

        private async Task<bool> IsPhoneNumberExisted(string phoneNumber)
        {
            var isExisted = await _context.Stylists.Where(stylist => stylist.PhoneNumber == phoneNumber).AnyAsync();

            return isExisted;
        }
    }
}
