using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels.Combos
{
    public class CreateComboModel
    {
        public string? Name { get; set; }
        public double? Discount { get; set; }
        public double? TotalPrice { get; set; }
        public int? Duration { get; set; }
        public IFormFile? Image { get; set; }
        public string? Description { get; set; }
        public ICollection<Guid>? Services { get; set; }
    }
}
