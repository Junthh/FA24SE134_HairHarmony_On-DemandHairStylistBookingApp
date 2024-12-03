namespace hair_hamony.Business.ViewModels.StylistSalaryDetails
{
    public class CreateStylistSalaryDetailModel
    {
        public double? Commission { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? StylistSalaryId { get; set; }
        public Guid? BookingId { get; set; }
    }
}
