namespace hair_hamony.Business.ViewModels.Bookings
{
    public class GetBookingByStatusModel
    {
        public int Initialize { get; set; }
        public int Confirmed { get; set; }
        public int Processing { get; set; }
        public int Completed { get; set; }
        public int Finished { get; set; }
        public int Cancel { get; set; }
    }
}
