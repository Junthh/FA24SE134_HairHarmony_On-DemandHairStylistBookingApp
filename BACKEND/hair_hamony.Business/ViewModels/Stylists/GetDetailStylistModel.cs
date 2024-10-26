using hair_hamony.Business.ViewModels.Users;

namespace hair_hamony.Business.ViewModels.Stylists
{
    public class GetDetailStylistModel
    {
        public Guid Id { get; set; }
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public string? Level { get; set; }
        public int? Experience { get; set; }
        public int? Kpi { get; set; }
        public double? Salary { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UserId { get; set; }
        public GetUserModel? User { get; set; }
    }
}
