using FirebaseAdmin.Messaging;

namespace hair_hamony.Business.Utilities.Notifications
{
    public class PushNotification
    {
        public static async Task SendMessage(string uid, string title, string content)
        {
            var topic = uid;

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
                        {"title", title},
                        {"content", content}
                    },
                Topic = topic
            };
            await FirebaseMessaging.DefaultInstance.SendAsync(message);
        }
    }
}
