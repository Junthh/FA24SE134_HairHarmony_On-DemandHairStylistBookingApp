namespace hair_hamony.Business.ViewModels.Customers
{
    public class GetCustomerModel
    {
        public Guid Id { get; set; }
        public int? LoyaltyPoints { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? UserId { get; set; }
    }
}
