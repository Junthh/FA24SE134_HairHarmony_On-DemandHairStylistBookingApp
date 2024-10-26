namespace hair_hamony.Business.ViewModels.Staffs
{
    public class GetStaffModel
    {
        public Guid Id { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? Avatar { get; set; }
    }
}
