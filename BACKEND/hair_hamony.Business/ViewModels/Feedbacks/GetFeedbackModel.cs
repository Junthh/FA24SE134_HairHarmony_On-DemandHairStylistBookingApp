namespace hair_hamony.Business.ViewModels.Feedbacks
{
    public class GetFeedbackModel
    {
        public Guid Id { get; set; }
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? BookingId { get; set; }
        public Guid? StylistId { get; set; }
    }
}
