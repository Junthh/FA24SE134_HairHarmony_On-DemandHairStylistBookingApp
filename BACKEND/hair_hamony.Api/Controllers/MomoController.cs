using hair_hamony.Business.Services.MomoServices;
using hair_hamony.Business.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace hair_hamony.API.Controllers
{
    public class MomoController : BaseApiController
    {
        private readonly IMomoService _momoService;
        public MomoController(IMomoService momoService)
        {
            _momoService = momoService;
        }

        /// <summary>
        /// Endpoint for create url momo payment
        /// </summary>
        /// <returns>Url momo payment</returns>
        /// <response code="200">Returns a url momo payment</response>
        [HttpPost()]
        [AllowAnonymous]
        [ProducesResponseType(typeof(BaseResponse<string>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> Create()
        {
            return Ok(new BaseResponse<string>(
                data: await _momoService.Create()
            ));
        }
    }
}
