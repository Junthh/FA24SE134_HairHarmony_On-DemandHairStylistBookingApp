using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.TransactionServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Transactions;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class TransactionController : BaseApiController
    {
        private readonly ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        /// <summary>
        /// Endpoint for get all transaction with condition
        /// </summary>
        /// <param name="searchTransactionModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of transaction</returns>
        /// <response code="200">Returns the list of transaction</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetTransactionModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<TransactionEnum.TransactionSort> paginationModel,
            [FromQuery] SearchTransactionModel searchTransactionModel)
        {
            var (transactions, total) = await _transactionService.GetAll(paginationModel, searchTransactionModel);

            return Ok(new ModelsResponse<GetTransactionModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: transactions
                ));
        }

        /// <summary>
        /// Endpoint for get transaction by Id
        /// </summary>
        /// <param name="id">Id of transaction</param>
        /// <returns>List of transaction</returns>
        /// <response code="200">Returns the transaction</response>
        /// <response code="404">Returns if the transaction is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetTransactionModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetTransactionModel>(
                    data: await _transactionService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create transaction
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a transaction</param>
        /// <returns>A transaction within status 201 or error status</returns>
        /// <response code="201">Returns the transaction</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetTransactionModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateTransactionModel requestBody)
        {
            return Ok(new BaseResponse<GetTransactionModel>(
                    statusCode: 201, data: await _transactionService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for transaction edit transaction
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a transaction</param>
        /// <returns>A transaction within status 200 or error status</returns>
        /// <response code="200">Returns transaction after update</response>
        /// <response code="404">Returns if the transaction is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetTransactionModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateTransactionModel requestBody)
        {
            return Ok(new BaseResponse<GetTransactionModel>(
                    data: await _transactionService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for transaction delete a transaction
        /// </summary>
        /// <param name="id">Id of transaction</param>
        /// <returns>A transaction within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the transaction is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _transactionService.Delete(id);
            return NoContent();
        }
    }
}
