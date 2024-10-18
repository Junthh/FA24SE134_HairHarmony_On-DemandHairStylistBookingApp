namespace hair_hamony.Business.ViewModels.Customers
{
    public class UpdateCustomerModel
    {
        public Guid Id { get; set; }
        public int? LoyaltyPoints { get; set; }
        public Guid? UserId { get; set; }
    }
}
