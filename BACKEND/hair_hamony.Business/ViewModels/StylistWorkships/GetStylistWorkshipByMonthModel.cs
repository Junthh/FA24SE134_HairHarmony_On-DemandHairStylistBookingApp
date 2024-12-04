namespace hair_hamony.Business.ViewModels.StylistWorkships
{
    public class GetStylistWorkshipByMonthModel
    {
        public DateOnly? Date { get; set; }
        public ICollection<StylistModel> Stylists { get; set; } = new List<StylistModel>();

        public class StylistModel
        {
            public Guid Id { get; set; }
            public string? FullName { get; set; }
            public string? Username { get; set; }
            public ICollection<WorkShipModel> Workships { get; set; } = new List<WorkShipModel>();
        }

        public class WorkShipModel
        {
            public string? Time { get; set; }
            public bool? IsRegister { get; set; }
        }
    }

}
