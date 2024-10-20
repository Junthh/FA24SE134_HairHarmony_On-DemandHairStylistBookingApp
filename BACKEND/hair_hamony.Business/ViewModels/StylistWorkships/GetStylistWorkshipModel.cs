namespace hair_hamony.Business.ViewModels.StylistWorkships
{
    public class GetStylistWorkshipModel
    {
        public Guid Id { get; set; }
        public DateOnly? RegisterDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? WorkshipId { get; set; }
        public Guid? StylistId { get; set; }
    }
}
