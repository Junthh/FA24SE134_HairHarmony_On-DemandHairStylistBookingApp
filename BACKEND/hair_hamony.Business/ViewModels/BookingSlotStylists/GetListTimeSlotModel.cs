using hair_hamony.Business.ViewModels.Stylists;
using hair_hamony.Business.ViewModels.TimeSlots;

namespace hair_hamony.Business.ViewModels.BookingSlotStylists
{
    public class GetListTimeSlotModel
    {
        public GetTimeSlotModel? TimeSlot { get; set; }
        public ICollection<GetStylistModel> Stylists { get; set; } = new List<GetStylistModel>();
    }
}
