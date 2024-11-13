using hair_hamony.Business.ViewModels.BookingSlotStylists;
using hair_hamony.Business.ViewModels.Combos;
using hair_hamony.Business.ViewModels.Services;

namespace hair_hamony.Business.ViewModels.BookingDetails
{
    public class GetDetailBookingDetailModel
    {
        public Guid Id { get; set; }
        public double? Price { get; set; }
        public int? Duration { get; set; }
        public Guid? BookingId { get; set; }
        public Guid? ServiceId { get; set; }
        public Guid? ComboId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public ICollection<GetDetailBookingSlotStylistModel>? BookingSlotStylists { get; set; } = new List<GetDetailBookingSlotStylistModel>();
        public GetServiceModel? Service { get; set; }
        public GetComboModel? Combo { get; set; }
    }
}
