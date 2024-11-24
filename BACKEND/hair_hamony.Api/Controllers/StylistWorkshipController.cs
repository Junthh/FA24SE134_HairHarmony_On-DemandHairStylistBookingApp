using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.StylistWorkshipServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.StylistWorkships;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class StylistWorkshipController : BaseApiController
    {
        private readonly IStylistWorkshipService _stylistWorkshipService;
        public StylistWorkshipController(IStylistWorkshipService stylistWorkshipService)
        {
            _stylistWorkshipService = stylistWorkshipService;
        }

        /// <summary>
        /// Endpoint for get all stylistWorkship with condition
        /// </summary>
        /// <param name="searchStylistWorkshipModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <param name="startDate">A start date wanna search by register date</param>
        /// <param name="endDate">A end date wanna search by register date</param>
        /// <returns>List of stylistWorkship</returns>
        /// <response code="200">Returns the list of stylistWorkship</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetDetailStylistWorkshipModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<StylistWorkshipEnum.StylistWorkshipSort> paginationModel,
            [FromQuery] SearchStylistWorkshipModel searchStylistWorkshipModel,
            [FromQuery] DateOnly? startDate, [FromQuery] DateOnly? endDate)
        {
            var (stylistWorkships, total) = await _stylistWorkshipService.GetAll(
                paginationModel,
                searchStylistWorkshipModel,
                startDate, endDate);

            return Ok(new ModelsResponse<GetDetailStylistWorkshipModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: stylistWorkships
                ));
        }

        /// <summary>
        /// Endpoint for get stylistWorkship by Id
        /// </summary>
        /// <param name="id">Id of stylistWorkship</param>
        /// <returns>List of stylistWorkship</returns>
        /// <response code="200">Returns the stylistWorkship</response>
        /// <response code="404">Returns if the stylistWorkship is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStylistWorkshipModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetStylistWorkshipModel>(
                    data: await _stylistWorkshipService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create stylistWorkship
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a stylistWorkship</param>
        /// <returns>A stylistWorkship within status 201 or error status</returns>
        /// <response code="201">Returns the stylistWorkship</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<IList<GetStylistWorkshipModel>>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateStylistWorkshipModel requestBody)
        {
            return Ok(new BaseResponse<IList<GetStylistWorkshipModel>>(
                    statusCode: 201, data: await _stylistWorkshipService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for stylistWorkship edit stylistWorkship
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a stylistWorkship</param>
        /// <returns>A stylistWorkship within status 200 or error status</returns>
        /// <response code="200">Returns stylistWorkship after update</response>
        /// <response code="404">Returns if the stylistWorkship is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStylistWorkshipModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateStylistWorkshipModel requestBody)
        {
            return Ok(new BaseResponse<GetStylistWorkshipModel>(
                    data: await _stylistWorkshipService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for stylistWorkship delete a stylistWorkship
        /// </summary>
        /// <param name="id">Id of stylistWorkship</param>
        /// <returns>A stylistWorkship within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the stylistWorkship is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _stylistWorkshipService.Delete(id);
            return NoContent();
        }
    }
}
