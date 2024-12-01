namespace hair_hamony.Business.ViewModels.StaffSalarys
{
    public class UpdateStaffSalaryModel
    {
        public Guid Id { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
        public double? TotalSalary { get; set; }
        public Guid? StaffId { get; set; }
    }
}
