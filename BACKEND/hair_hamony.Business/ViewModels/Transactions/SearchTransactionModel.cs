namespace hair_hamony.Business.ViewModels.Transactions
{
    public class SearchTransactionModel
    {
        public string? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? BookingId { get; set; }
    }
}
