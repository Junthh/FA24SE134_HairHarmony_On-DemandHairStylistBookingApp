using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Owners
{
    public class CreateOwnerModel
    {
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
