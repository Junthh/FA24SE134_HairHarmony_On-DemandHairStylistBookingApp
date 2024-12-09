namespace hair_hamony.Business.Services.SendSms
{
    public interface ISmsService
    {
        public void SendASMSVerificationCode(string receiverPhoneNumber);
        public void CheckAVerificationCode(string receiverPhoneNumber, string code);
    }
}
