using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.News
{
    public class CreateNewsModel
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Author { get; set; }
        public IFormFile? Thumbnail { get; set; }
        public Guid? StaffId { get; set; }
    }
}
