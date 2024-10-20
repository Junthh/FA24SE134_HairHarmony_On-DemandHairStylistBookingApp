namespace hair_hamony.Business.ViewModels.Users
{
    public class GetUserModel
    {
        public Guid Id { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public Guid? RoleId { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
