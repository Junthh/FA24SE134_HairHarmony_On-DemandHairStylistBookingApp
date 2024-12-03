using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Business.ViewModels.StylistWorkships;

namespace hair_hamony.Business.ViewModels.BookingSlotStylists
{
    public class GetBookingSlotStylistModel
    {
        public Guid Id { get; set; }
        public string? Status { get; set; }
        public DateOnly? BookingDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? KpiId { get; set; }
        public Guid? BookingDetailId { get; set; }
        public Guid? TimeSlotId { get; set; }
        public Guid? StylistId { get; set; }
        public Guid? StylistWorkshipId { get; set; }
        public GetStylistModel? Stylist { get; set; }
        public GetStylistWorkshipModel? StylistWorkship { get; set; }
    }
}
