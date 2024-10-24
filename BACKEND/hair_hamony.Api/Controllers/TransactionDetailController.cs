using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.TransactionDetailServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.TransactionDetails;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class TransactionDetailController : BaseApiController
    {
        private readonly ITransactionDetailService _transactionDetailService;
        public TransactionDetailController(ITransactionDetailService transactionDetailService)
        {
            _transactionDetailService = transactionDetailService;
        }

        /// <summary>
        /// Endpoint for get all transactionDetail with condition
        /// </summary>
        /// <param name="searchTransactionDetailModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of transactionDetail</returns>
        /// <response code="200">Returns the list of transactionDetail</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetTransactionDetailModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<TransactionDetailEnum.TransactionDetailSort> paginationModel,
            [FromQuery] SearchTransactionDetailModel searchTransactionDetailModel)
        {
            var (transactionDetails, total) = await _transactionDetailService.GetAll(paginationModel, searchTransactionDetailModel);

            return Ok(new ModelsResponse<GetTransactionDetailModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: transactionDetails
                ));
        }

        /// <summary>
        /// Endpoint for get transactionDetail by Id
        /// </summary>
        /// <param name="id">Id of transactionDetail</param>
        /// <returns>List of transactionDetail</returns>
        /// <response code="200">Returns the transactionDetail</response>
        /// <response code="404">Returns if the transactionDetail is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetTransactionDetailModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetTransactionDetailModel>(
                    data: await _transactionDetailService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create transactionDetail
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a transactionDetail</param>
        /// <returns>A transactionDetail within status 201 or error status</returns>
        /// <response code="201">Returns the transactionDetail</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetTransactionDetailModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateTransactionDetailModel requestBody)
        {
            return Ok(new BaseResponse<GetTransactionDetailModel>(
                    statusCode: 201, data: await _transactionDetailService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for transactionDetail edit transactionDetail
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a transactionDetail</param>
        /// <returns>A transactionDetail within status 200 or error status</returns>
        /// <response code="200">Returns transactionDetail after update</response>
        /// <response code="404">Returns if the transactionDetail is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetTransactionDetailModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateTransactionDetailModel requestBody)
        {
            return Ok(new BaseResponse<GetTransactionDetailModel>(
                    data: await _transactionDetailService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for transactionDetail delete a transactionDetail
        /// </summary>
        /// <param name="id">Id of transactionDetail</param>
        /// <returns>A transactionDetail within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the transactionDetail is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _transactionDetailService.Delete(id);
            return NoContent();
        }
    }
}
