namespace hair_hamony.Business.ViewModels.Combos
{
    public class SearchComboModel
    {
        public string? Name { get; set; }
        public double? Discount { get; set; }
        public double? TotalPrice { get; set; }
        public int? Duration { get; set; }
        public string? Description { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
