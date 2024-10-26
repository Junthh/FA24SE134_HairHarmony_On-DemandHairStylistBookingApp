namespace hair_hamony.Business.ViewModels.Combos
{
    public class UpdateComboModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public double? Discount { get; set; }
        public double? TotalPrice { get; set; }
        public int? Duration { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
    }
}
