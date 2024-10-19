namespace hair_hamony.Business.ViewModels.TransactionDetails
{
    public class UpdateTransactionDetailModel
    {
        public Guid Id { get; set; }
        public int? LoyaltyPoints { get; set; }
        public string? Status { get; set; }
        public Guid? TransactionId { get; set; }
        public Guid? BookingDetailId { get; set; }
        public Guid? PaymentId { get; set; }
    }
}
