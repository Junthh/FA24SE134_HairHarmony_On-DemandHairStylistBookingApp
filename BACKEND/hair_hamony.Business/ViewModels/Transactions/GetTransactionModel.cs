namespace hair_hamony.Business.ViewModels.Transactions
{
    public class GetTransactionModel
    {
        public Guid Id { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? BookingId { get; set; }
    }
}
