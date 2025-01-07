namespace hair_hamony.Business.ViewModels.Bookings
{
    public class UpdateBookingModel
    {
        public Guid Id { get; set; }
        public DateOnly? BookingDate { get; set; }
        public double? ExpertFee { get; set; }
        public double? TotalPrice { get; set; }
        public double? AmoutToPaid { get; set; }
        public int? LoyaltyPoints { get; set; }
        public string? Status { get; set; }
        public Guid? CustomerId { get; set; }
        public Guid? StaffId { get; set; }
        public string? PaymentMethod { get; set; }
        public Guid? StylistId { get; set; }
    }
}
