namespace hair_hamony.Business.ViewModels.Notifications
{
    public class GetNotificationModel
    {
        public Guid Id { get; set; }
        public string? Image { get; set; }
        public string? Content { get; set; }
        public string? Url { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? ReceiverId { get; set; }
        public string? Status { get; set; }
    }
}
