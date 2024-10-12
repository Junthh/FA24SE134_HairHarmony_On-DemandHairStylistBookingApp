namespace hair_hamony.Business.ViewModels.Categories
{
    public class GetCategoryModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
