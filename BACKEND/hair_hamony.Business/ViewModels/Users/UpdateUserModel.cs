namespace hair_hamony.Business.ViewModels.Users
{
    public class UpdateUserModel
    {
        public Guid Id { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Avatar { get; set; }
        public Guid? RoleId { get; set; }
    }
}
