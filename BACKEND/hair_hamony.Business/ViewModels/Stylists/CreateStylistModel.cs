using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Stylists
{
    public class CreateStylistModel
    {
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public string? Level { get; set; }
        public int? Experience { get; set; }
        public double? Salary { get; set; }
        public required string Username { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}
