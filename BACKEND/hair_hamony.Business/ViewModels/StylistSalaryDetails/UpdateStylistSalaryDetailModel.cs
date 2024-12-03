namespace hair_hamony.Business.ViewModels.StylistSalaryDetails
{
    public class UpdateStylistSalaryDetailModel
    {
        public Guid Id { get; set; }
        public double? Commission { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? StylistSalaryId { get; set; }
        public Guid? BookingId { get; set; }
    }
}
