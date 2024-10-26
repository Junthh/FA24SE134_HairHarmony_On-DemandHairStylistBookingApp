using hair_hamony.Business.ViewModels.Roles;

namespace hair_hamony.Business.ViewModels.Users
{
    public class GetUserDetailModel
    {
        public Guid Id { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Avatar { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? RoleId { get; set; }
        public GetRoleModel? Role { get; set; }
    }
}
