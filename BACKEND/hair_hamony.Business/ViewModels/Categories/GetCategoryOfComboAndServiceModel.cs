namespace hair_hamony.Business.ViewModels.Categories
{
    public class GetCategoryOfComboAndServiceModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public IList<ServiceModel>? Services { get; set; }

        public class ServiceModel
        {
            public Guid Id { get; set; }
            public string? Name { get; set; }
            public double? Discount { get; set; }
            public double? Price { get; set; }
            public int? Duration { get; set; }
            public string? Image { get; set; }
            public string? Description { get; set; }
            public DateTime? CreatedDate { get; set; }
            public DateTime? UpdatedDate { get; set; }
            public Guid? CategoryId { get; set; }
        }
    }
}
