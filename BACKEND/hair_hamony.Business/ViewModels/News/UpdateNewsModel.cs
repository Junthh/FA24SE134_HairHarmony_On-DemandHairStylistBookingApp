using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.News
{
    public class UpdateNewsModel
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Author { get; set; }
        public IFormFile? Thumbnail { get; set; }
        public Guid? StaffId { get; set; }
    }
}
