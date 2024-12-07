using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Business.ViewModels.Timekeepings;
using hair_hamony.Business.ViewModels.Workships;

namespace hair_hamony.Business.ViewModels.StylistWorkships
{
    public class GetDetailStylistWorkshipModel
    {
        public Guid Id { get; set; }
        public DateOnly? RegisterDate { get; set; }
        public bool? IsTimekeeping { get; set; }
        public Guid? TimekeepingId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? WorkshipId { get; set; }
        public Guid? StylistId { get; set; }
        public GetWorkshipModel? Workship { get; set; }
        public GetStylistModel? Stylist { get; set; }
        public GetTimekeepingModel? Timekeeping { get; set; }
    }
}
