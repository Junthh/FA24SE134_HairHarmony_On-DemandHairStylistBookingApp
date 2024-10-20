using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.PaymentServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Payments;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        /// <summary>
        /// Endpoint for get all payment with condition
        /// </summary>
        /// <param name="searchPaymentModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of payment</returns>
        /// <response code="200">Returns the list of payment</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetPaymentModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<PaymentEnum.PaymentSort> paginationModel,
            [FromQuery] SearchPaymentModel searchPaymentModel)
        {
            var (payments, total) = await _paymentService.GetAll(paginationModel, searchPaymentModel);

            return Ok(new ModelsResponse<GetPaymentModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: payments
                ));
        }

        /// <summary>
        /// Endpoint for get payment by Id
        /// </summary>
        /// <param name="id">Id of payment</param>
        /// <returns>List of payment</returns>
        /// <response code="200">Returns the payment</response>
        /// <response code="404">Returns if the payment is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetPaymentModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetPaymentModel>(
                    data: await _paymentService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create payment
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a payment</param>
        /// <returns>A payment within status 201 or error status</returns>
        /// <response code="201">Returns the payment</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetPaymentModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreatePaymentModel requestBody)
        {
            return Ok(new BaseResponse<GetPaymentModel>(
                    statusCode: 201, data: await _paymentService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for payment edit payment
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a payment</param>
        /// <returns>A payment within status 200 or error status</returns>
        /// <response code="200">Returns payment after update</response>
        /// <response code="404">Returns if the payment is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetPaymentModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdatePaymentModel requestBody)
        {
            return Ok(new BaseResponse<GetPaymentModel>(
                    data: await _paymentService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for payment delete a payment
        /// </summary>
        /// <param name="id">Id of payment</param>
        /// <returns>A payment within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the payment is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _paymentService.Delete(id);
            return NoContent();
        }
    }
}
