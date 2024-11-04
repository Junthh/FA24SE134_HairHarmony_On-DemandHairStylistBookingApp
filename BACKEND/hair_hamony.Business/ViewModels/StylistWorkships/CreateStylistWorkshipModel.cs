namespace hair_hamony.Business.ViewModels.StylistWorkships
{
    public class CreateStylistWorkshipModel
    {
        public DateOnly? RegisterDate { get; set; }
        public Guid? WorkshipId { get; set; }
        public Guid? StylistId { get; set; }
    }
}
