using hair_hamony.Business.ViewModels.Stylists;

namespace hair_hamony.Business.ViewModels.StylistSalarys
{
    public class GetDetailStylistSalaryModel
    {
        public Guid Id { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
        public int? TotalBooking { get; set; }
        public double? TotalCommission { get; set; }
        public double? TotalSalary { get; set; }
        public int? Kpi { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? StylistId { get; set; }
        public GetStylistModel? Stylist { get; set; }
    }
}
