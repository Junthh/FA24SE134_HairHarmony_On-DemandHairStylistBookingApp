namespace hair_hamony.Business.ViewModels.Kpis
{
    public class CreateKpiModel
    {
        public string? Name { get; set; }
        public int? Value { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
