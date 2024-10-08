﻿using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        private readonly IJwtHelper _jwtHelper;
        public UserService(IMapper mapper, IJwtHelper jwtHelper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
            _jwtHelper = jwtHelper;
        }

        public async Task<GetUserModel> Create(CreateUserModel requestBody)
        {
            var user = _mapper.Map<User>(requestBody);
            user.CreatedDate = DateTime.Now;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetUserModel>(user);
        }

        public async Task Delete(Guid id)
        {
            var user = _mapper.Map<User>(await GetById(id));
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetUserModel>, int)> GetAll(PagingParam<UserEnum.UserSort> paginationModel, SearchUserModel searchUserModel)
        {
            var query = _context.Users.AsQueryable();
            query = query.GetWithSearch(searchUserModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetUserModel>>(query);

            return (results, total);
        }

        public async Task<GetUserModel> GetById(Guid id)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(user => user.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetUserModel>(user);
        }

        public async Task<GetUserModel> Update(Guid id, UpdateUserModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var user = _mapper.Map<User>(await GetById(id));
            user.Username = requestBody.Username;
            user.FullName = requestBody.FullName;
            user.Email = requestBody.Email;
            user.PhoneNumber = requestBody.PhoneNumber;
            user.RoleId = requestBody.RoleId;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetUserModel>(user);
        }

        public async Task<(string token, User user)> Login(UserLoginModel requestBody)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => requestBody.Username == user.Username)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(requestBody.Password, user.Password);
            if (!isValidPassword)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tên tài khoản hoặc mật khẩu không chính xác"
                };
            }

            var roleName = _context.Roles.FirstOrDefaultAsync(role => role.Id == user.RoleId)!.Result!.Name;

            var token = _jwtHelper.GenerateJwtToken(role: roleName!, id: user.Id, email: user.Email, phoneNumber: user.PhoneNumber, username: user.Username);
            return (token, user);
        }

        public async Task<GetUserModel> ChangePassword(Guid id, string oldPassword, string newPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Tài khoản không tồn tại"
                };

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(oldPassword, user.Password);
            if (!isValidPassword)
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Mật khẩu cũ không chính xác"
                };

            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(newPassword);
            user.Password = passwordHashed;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return _mapper.Map<GetUserModel>(user);
        }
    }
}
