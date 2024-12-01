namespace hair_hamony.Business.ViewModels.Customers
{
    public class GetCustomerModel
    {
        public Guid Id { get; set; }
        public int? LoyaltyPoints { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public string? Avatar { get; set; }
        public string? Password { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
