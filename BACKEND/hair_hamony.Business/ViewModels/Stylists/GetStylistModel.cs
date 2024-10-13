namespace hair_hamony.Business.ViewModels.Stylists
{
    public class GetStylistModel
    {
        public Guid Id { get; set; }
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UserId { get; set; }
        public Guid? LevelId { get; set; }
    }
}
