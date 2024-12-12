namespace hair_hamony.Business.ViewModels.PaymentDetails
{
    public class GetPaymentDetailModel
    {
        public Guid Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public double? Price { get; set; }
        public string? Status { get; set; }
        public Guid? PaymentId { get; set; }
    }
}
