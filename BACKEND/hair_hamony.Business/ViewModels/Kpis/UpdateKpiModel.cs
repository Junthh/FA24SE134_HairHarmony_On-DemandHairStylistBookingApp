namespace hair_hamony.Business.ViewModels.Kpis
{
    public class UpdateKpiModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public int? Value { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
