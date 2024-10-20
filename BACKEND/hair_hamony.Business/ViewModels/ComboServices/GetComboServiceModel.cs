namespace hair_hamony.Business.ViewModels.ComboServices
{
    public class GetComboServiceModel
    {
        public Guid Id { get; set; }
        public Guid? ComboId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? ServiceId { get; set; }
    }
}
