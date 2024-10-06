using hair_hamony.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Data.Repositories.RoleRepositories
{
    public class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(DbContext context) : base(context)
        {
        }
    }
}
