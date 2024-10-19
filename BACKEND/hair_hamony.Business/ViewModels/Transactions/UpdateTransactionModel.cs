namespace hair_hamony.Business.ViewModels.Transactions
{
    public class UpdateTransactionModel
    {
        public Guid Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? BookingId { get; set; }
    }
}
