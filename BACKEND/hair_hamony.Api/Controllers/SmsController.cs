//using hair_hamony.Business.Services.SendSms;
//using hair_hamony.Business.ViewModels;
//using Asp.Versioning;
//using Microsoft.AspNetCore.Mvc;

//namespace hair_hamony.API.Controllers
//{
//    [ControllerName("Sm")]
//    public class SmsController : BaseApiController
//    {
//        private readonly ISmsService _sendSmsService;
//        public SmsController(ISmsService sendSmsService)
//        {
//            _sendSmsService = sendSmsService;
//        }

//        /// <summary>
//        /// Endpoint for send an SMS verification code
//        /// </summary>
//        /// <returns>A success message</returns>
//        /// <response code="200">Returns a success message</response>
//        [HttpGet("sendOTP")]
//        [ProducesResponseType(typeof(BaseResponse<>), StatusCodes.Status200OK)]
//        public IActionResult SendAVerificationCode(string receiverPhoneNumber)
//        {
//            _sendSmsService.SendASMSVerificationCode(receiverPhoneNumber);
//            return Ok(new
//            {
//                StatusCode = StatusCodes.Status200OK,
//                Msg = $"Send an verification code to {receiverPhoneNumber} successfully",
//                Success = true,
//                Data = "",
//            });
//        }

//        /// <summary>
//        /// Endpoint for check a verification code
//        /// </summary>
//        /// <returns>A success message</returns>
//        /// <response code="200">Returns a success message</response>
//        [HttpGet("verificationOTP")]
//        [ProducesResponseType(typeof(BaseResponse<>), StatusCodes.Status200OK)]
//        public IActionResult CheckAnVerificationCode(string receiverPhoneNumber, string code)
//        {
//            bool isValid = _sendSmsService.CheckAVerificationCode(receiverPhoneNumber, code);
//            if (isValid)
//            {
//                return Ok(new
//                {
//                    StatusCode = StatusCodes.Status200OK,
//                    Msg = "Verification code is valid",
//                    Success = true,
//                    Data = "",
//                });
//            }
//            else
//            {
//                return BadRequest(new
//                {
//                    StatusCode = StatusCodes.Status400BadRequest,
//                    Msg = "Verification code is not valid",
//                    Success = false,
//                    Data = "",
//                });
//            }
//        }
//    }
//}
