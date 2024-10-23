using hair_hamony.Business.ViewModels.Users;

namespace hair_hamony.Business.ViewModels.Stylists
{
    public class GetDetailStylistModel
    {
        public Guid Id { get; set; }
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UserId { get; set; }
        public Guid? LevelId { get; set; }
        public GetUserModel? User { get; set; }
    }
}
