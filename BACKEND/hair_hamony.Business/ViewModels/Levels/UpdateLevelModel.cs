namespace hair_hamony.Business.ViewModels.Levels
{
    public class UpdateLevelModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public int? Experience { get; set; }
        public double? Salary { get; set; }
        public int? Kpi { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
