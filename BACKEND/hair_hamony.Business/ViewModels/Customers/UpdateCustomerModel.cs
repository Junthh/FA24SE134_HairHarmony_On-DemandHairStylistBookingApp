using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Customers
{
    public class UpdateCustomerModel
    {
        public Guid Id { get; set; }
        public int? LoyaltyPoints { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
