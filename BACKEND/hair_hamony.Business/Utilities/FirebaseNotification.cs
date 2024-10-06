using FirebaseAdmin.Messaging;

namespace hair_hamony.Business.Utilities
{
    public class FirebaseNotification
    {
        public static async Task<string> SendNotification(string topic, string title, string content)
        {
            var message = new Message
            {
                Notification = new Notification
                {
                    Title = title,
                    Body = content
                },
                Android = new AndroidConfig()
                {
                    Notification = new AndroidNotification
                    {
                        Icon = "stock_ticker_update",
                        Color = "#f45342",
                        Sound = "default"
                    }
                },
                Data = new Dictionary<string, string>()
                {
                    {"title", title },
                    {"content", content}
                },
                Topic = topic,
            };

            return await FirebaseMessaging.DefaultInstance.SendAsync(message);
        }
    }
}
