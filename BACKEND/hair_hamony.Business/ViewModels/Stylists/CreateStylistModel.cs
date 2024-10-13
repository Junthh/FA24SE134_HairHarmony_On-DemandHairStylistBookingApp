namespace hair_hamony.Business.ViewModels.Stylists
{
    public class CreateStylistModel
    {
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public Guid? UserId { get; set; }
        public Guid? LevelId { get; set; }
    }
}
