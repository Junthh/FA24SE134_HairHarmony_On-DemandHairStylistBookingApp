using hair_hamony.Business.ViewModels.Bookings;

namespace hair_hamony.Business.ViewModels.StylistSalaryDetails
{
    public class GetDetailStylistSalaryDetailModel
    {
        public Guid Id { get; set; }
        public double? Commission { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? StylistSalaryId { get; set; }
        public Guid? BookingId { get; set; }
        public GetDetailBookingModel? Booking { get; set; }
    }
}
