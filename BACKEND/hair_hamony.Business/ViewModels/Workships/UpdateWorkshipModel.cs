namespace hair_hamony.Business.ViewModels.Workships
{
    public class UpdateWorkshipModel
    {
        public Guid Id { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
    }
}
