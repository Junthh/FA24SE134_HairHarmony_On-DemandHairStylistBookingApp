namespace hair_hamony.Business.ViewModels.StylistWorkships
{
    public class CreateStylistWorkshipModel
    {
        public DateOnly? RegisterDate { get; set; }
        public ICollection<Guid>? WorkshipIds { get; set; } = new List<Guid>();
        public Guid? StylistId { get; set; }
    }
}
