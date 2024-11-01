using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Categories
{
    public class UpdateCategoryModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }
    }
}
