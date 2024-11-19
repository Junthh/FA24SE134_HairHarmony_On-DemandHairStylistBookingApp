namespace hair_hamony.Business.ViewModels.Bookings
{
    public class CreateInitBookingModel
    {
        public required DateOnly BookingDate { get; set; }
        public int? LoyaltyPoints { get; set; }
        public Guid? CustomerId { get; set; }
        public string? CustomerFullName { get; set; }
        public string? CustomerPhoneNummber { get; set; }
        public bool? IsRandomStylist { get; set; }
        public double? ExpertFee { get; set; }
        public Guid? StaffId { get; set; }
        public required Guid TimeSlotId { get; set; }
        public required Guid StylistId { get; set; }
        public IList<CreateInitBookingModelServiceModel>? Services { get; set; }
        public IList<CreateInitBookingModelComboModel>? Combos { get; set; }

        public class CreateInitBookingModelServiceModel
        {
            public Guid? Id { get; set; }
            public double? Price { get; set; }
        }

        public class CreateInitBookingModelComboModel
        {
            public Guid? Id { get; set; }
            public double? TotalPrice { get; set; }
            public double? Discount { get; set; }
        }
    }
}
