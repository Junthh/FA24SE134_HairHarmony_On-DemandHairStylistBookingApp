namespace hair_hamony.Business.ViewModels.StylistSalaryDetails
{
    public class GetStylistSalaryDetailModel
    {
        public Guid Id { get; set; }
        public double? Commission { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? StylistSalaryId { get; set; }
        public Guid? BookingId { get; set; }
    }
}
