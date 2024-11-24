namespace hair_hamony.Business.ViewModels.TransactionDetails
{
    public class SearchTransactionDetailModel
    {
        public int? LoyaltyPoints { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? TransactionId { get; set; }
    }
}
