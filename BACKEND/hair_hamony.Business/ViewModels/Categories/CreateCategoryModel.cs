using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Categories
{
    public class CreateCategoryModel
    {
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }
    }
}
