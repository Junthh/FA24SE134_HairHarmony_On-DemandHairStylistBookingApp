namespace hair_hamony.Business.ViewModels.Images
{
    public class GetImageModel
    {
        public Guid Id { get; set; }
        public string? Url { get; set; }
        public Guid? RoomId { get; set; }
        public Guid? HomeStayId { get; set; }
    }
}
