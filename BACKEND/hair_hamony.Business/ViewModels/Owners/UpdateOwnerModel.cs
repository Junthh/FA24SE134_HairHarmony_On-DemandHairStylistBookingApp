namespace hair_hamony.Business.ViewModels.Owners
{
    public class UpdateOwnerModel
    {
        public Guid Id { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public string? Avatar { get; set; }
    }
}
