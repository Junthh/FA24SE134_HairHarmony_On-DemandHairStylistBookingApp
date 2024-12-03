using hair_hamony.Business.ViewModels.BookingDetails;
using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Business.ViewModels.TimeSlots;

namespace hair_hamony.Business.ViewModels.BookingSlotStylists
{
    public class GetDetailBookingSlotStylistModel
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
        public GetTimeSlotModel? TimeSlot { get; set; }
        public GetStylistModel? Stylist { get; set; }
        public GetDetailBookingDetailModel? BookingDetail { get; set; }
    }
}
