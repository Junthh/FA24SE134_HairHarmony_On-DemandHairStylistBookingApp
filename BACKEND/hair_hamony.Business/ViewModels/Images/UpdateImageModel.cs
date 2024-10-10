namespace hair_hamony.Business.ViewModels.Images
{
    public class UpdateImageModel
    {
        public required Guid Id { get; set; }
        public string? Url { get; set; }
        public Guid? RoomId { get; set; }
        public Guid? HomeStayId { get; set; }
    }
}
