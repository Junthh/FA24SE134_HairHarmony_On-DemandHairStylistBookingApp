using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Customers
{
    public class CreateCustomerModel
    {
        public int? LoyaltyPoints { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
