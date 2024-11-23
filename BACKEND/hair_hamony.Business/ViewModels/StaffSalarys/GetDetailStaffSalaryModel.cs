using hair_hamony.Business.ViewModels.Staffs;

namespace hair_hamony.Business.ViewModels.StaffSalarys
{
    public class GetDetailStaffSalaryModel
    {
        public Guid Id { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
        public double? TotalSalary { get; set; }
        public Guid? StaffId { get; set; }
        public GetStaffModel? Staff { get; set; }
    }
}
