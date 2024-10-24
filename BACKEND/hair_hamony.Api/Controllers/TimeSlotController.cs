using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.TimeSlotServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.TimeSlots;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class TimeSlotController : BaseApiController
    {
        private readonly ITimeSlotService _timeSlotService;
        public TimeSlotController(ITimeSlotService timeSlotService)
        {
            _timeSlotService = timeSlotService;
        }

        /// <summary>
        /// Endpoint for get all timeSlot with condition
        /// </summary>
        /// <param name="searchTimeSlotModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of timeSlot</returns>
        /// <response code="200">Returns the list of timeSlot</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetTimeSlotModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<TimeSlotEnum.TimeSlotSort> paginationModel,
            [FromQuery] SearchTimeSlotModel searchTimeSlotModel)
        {
            var (timeSlots, total) = await _timeSlotService.GetAll(paginationModel, searchTimeSlotModel);

            return Ok(new ModelsResponse<GetTimeSlotModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: timeSlots
                ));
        }

        /// <summary>
        /// Endpoint for get timeSlot by Id
        /// </summary>
        /// <param name="id">Id of timeSlot</param>
        /// <returns>List of timeSlot</returns>
        /// <response code="200">Returns the timeSlot</response>
        /// <response code="404">Returns if the timeSlot is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetTimeSlotModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetTimeSlotModel>(
                    data: await _timeSlotService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create timeSlot
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a timeSlot</param>
        /// <returns>A timeSlot within status 201 or error status</returns>
        /// <response code="201">Returns the timeSlot</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetTimeSlotModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateTimeSlotModel requestBody)
        {
            return Ok(new BaseResponse<GetTimeSlotModel>(
                    statusCode: 201, data: await _timeSlotService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for timeSlot edit timeSlot
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a timeSlot</param>
        /// <returns>A timeSlot within status 200 or error status</returns>
        /// <response code="200">Returns timeSlot after update</response>
        /// <response code="404">Returns if the timeSlot is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetTimeSlotModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateTimeSlotModel requestBody)
        {
            return Ok(new BaseResponse<GetTimeSlotModel>(
                    data: await _timeSlotService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for timeSlot delete a timeSlot
        /// </summary>
        /// <param name="id">Id of timeSlot</param>
        /// <returns>A timeSlot within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the timeSlot is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _timeSlotService.Delete(id);
            return NoContent();
        }
    }
}
