namespace hair_hamony.Business.ViewModels.Feedbacks
{
    public class SearchFeedbackModel
    {
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? BookingId { get; set; }
    }
}
