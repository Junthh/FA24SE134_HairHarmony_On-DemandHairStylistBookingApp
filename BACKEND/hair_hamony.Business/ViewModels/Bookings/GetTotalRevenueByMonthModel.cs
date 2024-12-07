namespace hair_hamony.Business.ViewModels.Bookings
{
    public class GetTotalRevenueByMonthModel
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public double TotalRevenue { get; set; }
        public ICollection<GetTotalRevenueByDayModel> TotalRevenueByDay { get; set; } = new List<GetTotalRevenueByDayModel>();
        public class GetTotalRevenueByDayModel
        {
            public int Day { get; set; }
            public double TotalRevenue { get; set; }
        }
    }
}
