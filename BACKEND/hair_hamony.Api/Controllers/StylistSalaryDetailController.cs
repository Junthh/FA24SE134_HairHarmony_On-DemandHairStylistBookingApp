using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.StylistSalaryDetailServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.StylistSalaryDetails;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class StylistSalaryDetailController : BaseApiController
    {
        private readonly IStylistSalaryDetailService _stylistSalaryDetailService;
        public StylistSalaryDetailController(IStylistSalaryDetailService stylistSalaryDetailService)
        {
            _stylistSalaryDetailService = stylistSalaryDetailService;
        }

        /// <summary>
        /// Endpoint for get all stylistSalaryDetail with condition
        /// </summary>
        /// <param name="searchStylistSalaryDetailModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of stylistSalaryDetail</returns>
        /// <response code="200">Returns the list of stylistSalaryDetail</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetStylistSalaryDetailModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<StylistSalaryDetailEnum.StylistSalaryDetailSort> paginationModel,
            [FromQuery] SearchStylistSalaryDetailModel searchStylistSalaryDetailModel)
        {
            var (stylistSalaryDetails, total) = await _stylistSalaryDetailService.GetAll(paginationModel, searchStylistSalaryDetailModel);

            return Ok(new ModelsResponse<GetStylistSalaryDetailModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: stylistSalaryDetails
                ));
        }

        /// <summary>
        /// Endpoint for get stylistSalaryDetail by Id
        /// </summary>
        /// <param name="id">Id of stylistSalaryDetail</param>
        /// <returns>List of stylistSalaryDetail</returns>
        /// <response code="200">Returns the stylistSalaryDetail</response>
        /// <response code="404">Returns if the stylistSalaryDetail is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStylistSalaryDetailModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetStylistSalaryDetailModel>(
                    data: await _stylistSalaryDetailService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create stylistSalaryDetail
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a stylistSalaryDetail</param>
        /// <returns>A stylistSalaryDetail within status 201 or error status</returns>
        /// <response code="201">Returns the stylistSalaryDetail</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetStylistSalaryDetailModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateStylistSalaryDetailModel requestBody)
        {
            return Ok(new BaseResponse<GetStylistSalaryDetailModel>(
                    statusCode: 201, data: await _stylistSalaryDetailService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for stylistSalaryDetail edit stylistSalaryDetail
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a stylistSalaryDetail</param>
        /// <returns>A stylistSalaryDetail within status 200 or error status</returns>
        /// <response code="200">Returns stylistSalaryDetail after update</response>
        /// <response code="404">Returns if the stylistSalaryDetail is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStylistSalaryDetailModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateStylistSalaryDetailModel requestBody)
        {
            return Ok(new BaseResponse<GetStylistSalaryDetailModel>(
                    data: await _stylistSalaryDetailService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for stylistSalaryDetail delete a stylistSalaryDetail
        /// </summary>
        /// <param name="id">Id of stylistSalaryDetail</param>
        /// <returns>A stylistSalaryDetail within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the stylistSalaryDetail is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _stylistSalaryDetailService.Delete(id);
            return NoContent();
        }
    }
}
