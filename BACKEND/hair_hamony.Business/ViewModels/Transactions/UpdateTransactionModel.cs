namespace hair_hamony.Business.ViewModels.Transactions
{
    public class UpdateTransactionModel
    {
        public Guid Id { get; set; }
        public string? Status { get; set; }
        public Guid? BookingId { get; set; }
    }
}
