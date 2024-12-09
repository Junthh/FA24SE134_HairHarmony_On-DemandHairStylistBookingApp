using Asp.Versioning;
using hair_hamony.Business.Services.SendSms;
using hair_hamony.Business.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace hair_hamony.API.Controllers
{
    [ControllerName("Sm")]
    public class SmsController : BaseApiController
    {
        private readonly ISmsService _sendSmsService;
        public SmsController(ISmsService sendSmsService)
        {
            _sendSmsService = sendSmsService;
        }

        /// <summary>
        /// Endpoint for send an SMS verification code
        /// </summary>
        /// <returns>A success message</returns>
        /// <response code="200">Returns a success message</response>
        [HttpGet("sendOTP")]
        [ProducesResponseType(typeof(BaseResponse<string>), StatusCodes.Status200OK)]
        public IActionResult SendAVerificationCode(string phoneNumber)
        {
            _sendSmsService.SendASMSVerificationCode(phoneNumber);
            return Ok(new BaseResponse<string>(data: $"Send an verification code to {phoneNumber} successfully"));
        }

        /// <summary>
        /// Endpoint for check a verification code
        /// </summary>
        /// <returns>A success message</returns>
        /// <response code="200">Returns a success message</response>
        [HttpGet("verificationOTP")]
        [ProducesResponseType(typeof(BaseResponse<string>), StatusCodes.Status200OK)]
        public IActionResult CheckAnVerificationCode(string phoneNumber, string code)
        {
            _sendSmsService.CheckAVerificationCode(phoneNumber, code);
            return Ok(new BaseResponse<string>(data: $"Verification code is correct"));
        }
    }
}
