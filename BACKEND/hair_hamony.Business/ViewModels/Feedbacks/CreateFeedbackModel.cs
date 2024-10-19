namespace hair_hamony.Business.ViewModels.Feedbacks
{
    public class CreateFeedbackModel
    {
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public Guid? BookingId { get; set; }
    }
}
