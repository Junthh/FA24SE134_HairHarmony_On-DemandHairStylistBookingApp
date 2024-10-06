using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Roles;
using hair_hamony.Business.ViewModels.Users;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.RoleServices
{
    public class RoleService : IRoleService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public RoleService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetRoleModel> Create(CreateRoleModel requestBody)
        {
            var role = _mapper.Map<Role>(requestBody);
            role.CreatedDate = DateTime.Now;
            await _context.Roles.AddAsync(role);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetRoleModel>(role);
        }

        public async Task Delete(Guid id)
        {
            var role = _mapper.Map<Role>(await GetById(id));
            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetRoleModel>, int)> GetAll(PagingParam<RoleEnum.RoleSort> paginationModel, SearchRoleModel searchRoleModel)
        {
            var query = _context.Roles.AsQueryable();
            query = query.GetWithSearch(searchRoleModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetRoleModel>>(query);

            return (results, total);
        }

        public async Task<GetRoleModel> GetById(Guid id)
        {
            var role = await _context.Roles.AsNoTracking().FirstOrDefaultAsync(role => role.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetRoleModel>(role);
        }

        public async Task<GetRoleModel> Update(Guid id, UpdateRoleModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var role = _mapper.Map<Role>(await GetById(id));
            role.Name = requestBody.Name;
            _context.Roles.Update(role);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetRoleModel>(role);
        }
    }
}
