using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Business.ViewModels.StylistWorkships;

namespace hair_hamony.Business.ViewModels.DayOffs
{
    public class GetDetailDayOffModel
    {
        public Guid Id { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
        public bool? IsApprove { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? StylistId { get; set; }
        public Guid? StylistWorkshipId { get; set; }
        public string? Type { get; set; }
        public GetStylistModel? Stylist { get; set; }
        public GetDetailStylistWorkshipModel? StylistWorkship { get; set; }
    }
}
