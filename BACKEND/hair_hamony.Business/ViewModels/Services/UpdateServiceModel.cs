namespace hair_hamony.Business.ViewModels.Services
{
    public class UpdateServiceModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public int? Duration { get; set; }
        public double? Price { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
