namespace hair_hamony.Business.ViewModels.Notifications
{
    public class CreateNotificationModel
    {
        public string? Image { get; set; }
        public string? Content { get; set; }
        public string? Url { get; set; }
        public Guid? ReceiverId { get; set; }
    }
}
