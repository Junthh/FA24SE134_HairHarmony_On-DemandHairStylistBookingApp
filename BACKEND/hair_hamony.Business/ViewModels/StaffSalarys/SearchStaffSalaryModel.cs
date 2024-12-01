namespace hair_hamony.Business.ViewModels.StaffSalarys
{
    public class SearchStaffSalaryModel
    {
        public int? Month { get; set; }
        public int? Year { get; set; }
        public double? TotalSalary { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? StaffId { get; set; }
    }
}
