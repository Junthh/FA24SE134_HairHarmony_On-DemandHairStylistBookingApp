using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.PaymentDetailServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.PaymentDetails;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class PaymentDetailController : BaseApiController
    {
        private readonly IPaymentDetailService _paymentDetailService;
        public PaymentDetailController(IPaymentDetailService paymentDetailService)
        {
            _paymentDetailService = paymentDetailService;
        }

        /// <summary>
        /// Endpoint for get all paymentDetail with condition
        /// </summary>
        /// <param name="searchPaymentDetailModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of paymentDetail</returns>
        /// <response code="200">Returns the list of paymentDetail</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetPaymentDetailModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<PaymentDetailEnum.PaymentDetailSort> paginationModel,
            [FromQuery] SearchPaymentDetailModel searchPaymentDetailModel)
        {
            var (paymentDetails, total) = await _paymentDetailService.GetAll(paginationModel, searchPaymentDetailModel);

            return Ok(new ModelsResponse<GetPaymentDetailModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: paymentDetails
                ));
        }

        /// <summary>
        /// Endpoint for get paymentDetail by Id
        /// </summary>
        /// <param name="id">Id of paymentDetail</param>
        /// <returns>List of paymentDetail</returns>
        /// <response code="200">Returns the paymentDetail</response>
        /// <response code="404">Returns if the paymentDetail is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetPaymentDetailModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetPaymentDetailModel>(
                    data: await _paymentDetailService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create paymentDetail
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a paymentDetail</param>
        /// <returns>A paymentDetail within status 201 or error status</returns>
        /// <response code="201">Returns the paymentDetail</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetPaymentDetailModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreatePaymentDetailModel requestBody)
        {
            return Ok(new BaseResponse<GetPaymentDetailModel>(
                    statusCode: 201, data: await _paymentDetailService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for paymentDetail edit paymentDetail
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a paymentDetail</param>
        /// <returns>A paymentDetail within status 200 or error status</returns>
        /// <response code="200">Returns paymentDetail after update</response>
        /// <response code="404">Returns if the paymentDetail is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetPaymentDetailModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdatePaymentDetailModel requestBody)
        {
            return Ok(new BaseResponse<GetPaymentDetailModel>(
                    data: await _paymentDetailService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for paymentDetail delete a paymentDetail
        /// </summary>
        /// <param name="id">Id of paymentDetail</param>
        /// <returns>A paymentDetail within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the paymentDetail is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _paymentDetailService.Delete(id);
            return NoContent();
        }
    }
}
