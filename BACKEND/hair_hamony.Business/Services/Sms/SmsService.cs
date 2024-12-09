using hair_hamony.Business.Utilities.ErrorHandling;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Verify.V2.Service;

namespace hair_hamony.Business.Services.SendSms
{
    public class SmsService : ISmsService
    {
        private readonly IConfiguration _configuration;
        public SmsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void CheckAVerificationCode(string receiverPhoneNumber, string code)
        {
            // Find your Account SID and Auth Token at twilio.com/console
            // and set the environment variables. See http://twil.io/secure
            string accountSid = _configuration[key: "Twilio:AccountSid"];
            string authToken = _configuration["Twilio:AuthToken"];

            TwilioClient.Init(accountSid, authToken);

            try
            {
                var verificationCheck = VerificationCheckResource.Create(
                    to: FormatPhoneNumber(receiverPhoneNumber),
                    code: code,
                    pathServiceSid: _configuration["Twilio:VerificationSid"]
                );

                if (verificationCheck.Status != "approved")
                {
                    throw new CException()
                    {
                        ErrorMessage = "Mã xác thực không chính xác",
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                }
            }
            catch (Exception ex)
            {
                // See https://www.twilio.com/docs/verify/api/verification-check#check-a-verification
                if (ex.Message.Contains("VerificationCheck was not found"))
                {
                    throw new CException()
                    {
                        ErrorMessage = "Vui lòng bấm gửi lại mã xác thực",
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                }
                throw new Exception(ex.Message);
            }
        }

        public void SendASMSVerificationCode(string receiverPhoneNumber)
        {
            // Find your Account SID and Auth Token at twilio.com/console
            // and set the environment variables. See http://twil.io/secure
            string accountSid = _configuration[key: "Twilio:AccountSID"];
            string authToken = _configuration["Twilio:AuthToken"];

            TwilioClient.Init(accountSid, authToken);

            VerificationResource.Create(
                to: FormatPhoneNumber(receiverPhoneNumber),
                channel: "sms",
                pathServiceSid: _configuration["Twilio:VerificationSid"]
            );
        }

        private string FormatPhoneNumber(string phoneNumber)
        {
            // convert phone number (0xxxx) to +84 format (+84xxxx)
            return "+84" + phoneNumber.Remove(0, 1);
        }
    }
}
