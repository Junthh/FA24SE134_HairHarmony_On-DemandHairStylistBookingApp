using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Images
{
    public class CreateImageModel
    {
        public IFormFile? Image { get; set; }
        public Guid? RoomId { get; set; }
        public Guid? HomeStayId { get; set; }
    }
}
