using hair_hamony.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Data.Repositories.UserRepositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }
    }
}
