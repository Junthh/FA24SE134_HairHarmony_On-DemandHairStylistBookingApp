namespace hair_hamony.Business.ViewModels.Workships
{
    public class GetWorkshipModel
    {
        public Guid Id { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
