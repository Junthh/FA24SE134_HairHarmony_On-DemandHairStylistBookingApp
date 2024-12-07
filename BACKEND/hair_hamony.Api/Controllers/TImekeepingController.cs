using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.TimekeepingServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Timekeepings;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class TimekeepingController : BaseApiController
    {
        private readonly ITimekeepingService _timekeepingService;
        public TimekeepingController(ITimekeepingService timekeepingService)
        {
            _timekeepingService = timekeepingService;
        }

        /// <summary>
        /// Endpoint for get all timekeeping with condition
        /// </summary>
        /// <param name="searchTimekeepingModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of timekeeping</returns>
        /// <response code="200">Returns the list of timekeeping</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetTimekeepingModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<TimekeepingEnum.TimekeepingSort> paginationModel,
            [FromQuery] SearchTimekeepingModel searchTimekeepingModel)
        {
            var (timekeepings, total) = await _timekeepingService.GetAll(paginationModel, searchTimekeepingModel);

            return Ok(new ModelsResponse<GetTimekeepingModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: timekeepings
                ));
        }

        /// <summary>
        /// Endpoint for get timekeeping by Id
        /// </summary>
        /// <param name="id">Id of timekeeping</param>
        /// <returns>List of timekeeping</returns>
        /// <response code="200">Returns the timekeeping</response>
        /// <response code="404">Returns if the timekeeping is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetTimekeepingModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetTimekeepingModel>(
                    data: await _timekeepingService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create timekeeping
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a timekeeping</param>
        /// <returns>A timekeeping within status 201 or error status</returns>
        /// <response code="201">Returns the timekeeping</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetTimekeepingModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateTimekeepingModel requestBody)
        {
            return Ok(new BaseResponse<GetTimekeepingModel>(
                    statusCode: 201, data: await _timekeepingService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for timekeeping edit timekeeping
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a timekeeping</param>
        /// <returns>A timekeeping within status 200 or error status</returns>
        /// <response code="200">Returns timekeeping after update</response>
        /// <response code="404">Returns if the timekeeping is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetTimekeepingModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateTimekeepingModel requestBody)
        {
            return Ok(new BaseResponse<GetTimekeepingModel>(
                    data: await _timekeepingService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for timekeeping delete a timekeeping
        /// </summary>
        /// <param name="id">Id of timekeeping</param>
        /// <returns>A timekeeping within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the timekeeping is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _timekeepingService.Delete(id);
            return NoContent();
        }
    }
}
