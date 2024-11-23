using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Staffs
{
    public class CreateStaffModel
    {
        public required string Username { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public double? Salary { get; set; }
        public IFormFile? Avatar { get; set; }
        public double? Salary { get; set; }
    }
}
