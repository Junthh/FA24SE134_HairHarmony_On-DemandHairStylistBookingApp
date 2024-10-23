namespace hair_hamony.Business.ViewModels.Services
{
    public class GetServiceModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public int? Duration { get; set; }
        public double? Price { get; set; }
        public string? Image { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
