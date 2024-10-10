namespace hair_hamony.Business.ViewModels.Notifications
{
    public class UpdateNotificationModel
    {
        public required Guid Id { get; set; }
        public string? Image { get; set; }
        public string? Content { get; set; }
        public string? Url { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? ReceiverId { get; set; }
        public string? Status { get; set; }
    }

    public class UpdateNotificationStatusModel
    {
        public required Guid Id { get; set; }
        public required string Status { get; set; }
    }
}
