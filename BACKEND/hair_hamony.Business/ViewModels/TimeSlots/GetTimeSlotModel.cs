namespace hair_hamony.Business.ViewModels.TimeSlots
{
    public class GetTimeSlotModel
    {
        public Guid Id { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
