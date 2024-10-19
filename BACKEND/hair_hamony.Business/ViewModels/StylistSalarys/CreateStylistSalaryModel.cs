namespace hair_hamony.Business.ViewModels.StylistSalarys
{
    public class CreateStylistSalaryModel
    {
        public int? Month { get; set; }
        public int? Year { get; set; }
        public int? TotalBooking { get; set; }
        public double? TotalCommission { get; set; }
        public double? TotalSalary { get; set; }
        public Guid? StylistId { get; set; }
    }
}
