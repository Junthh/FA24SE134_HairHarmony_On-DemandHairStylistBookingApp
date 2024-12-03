namespace hair_hamony.Business.ViewModels.BookingSlotStylists
{
    public class UpdateBookingSlotStylistModel
    {
        public Guid Id { get; set; }
        public string? Status { get; set; }
        public DateOnly? BookingDate { get; set; }
        public Guid? KpiId { get; set; }
        public Guid? BookingDetailId { get; set; }
        public Guid? TimeSlotId { get; set; }
        public Guid? StylistId { get; set; }
        public Guid? StylistWorkshipId { get; set; }
    }
}
