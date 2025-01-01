using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.DayOffServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.DayOffs;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class DayOffController : BaseApiController
    {
        private readonly IDayOffService _dayOffService;
        public DayOffController(IDayOffService dayOffService)
        {
            _dayOffService = dayOffService;
        }

        /// <summary>
        /// Endpoint for get all dayOff with condition
        /// </summary>
        /// <param name="searchDayOffModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of dayOff</returns>
        /// <response code="200">Returns the list of dayOff</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetDayOffModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<DayOffEnum.DayOffSort> paginationModel,
            [FromQuery] SearchDayOffModel searchDayOffModel)
        {
            var (dayOffs, total) = await _dayOffService.GetAll(paginationModel, searchDayOffModel);

            return Ok(new ModelsResponse<GetDayOffModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: dayOffs
                ));
        }

        /// <summary>
        /// Endpoint for get dayOff by Id
        /// </summary>
        /// <param name="id">Id of dayOff</param>
        /// <returns>List of dayOff</returns>
        /// <response code="200">Returns the dayOff</response>
        /// <response code="404">Returns if the dayOff is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetDayOffModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetDayOffModel>(
                    data: await _dayOffService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create dayOff
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a dayOff</param>
        /// <returns>A dayOff within status 201 or error status</returns>
        /// <response code="201">Returns the dayOff</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetDayOffModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromForm] CreateDayOffModel requestBody)
        {
            return Ok(new BaseResponse<GetDayOffModel>(
                    statusCode: 201, data: await _dayOffService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for dayOff edit dayOff
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a dayOff</param>
        /// <returns>A dayOff within status 200 or error status</returns>
        /// <response code="200">Returns dayOff after update</response>
        /// <response code="404">Returns if the dayOff is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetDayOffModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdateDayOffModel requestBody)
        {
            return Ok(new BaseResponse<GetDayOffModel>(
                    data: await _dayOffService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for dayOff delete a dayOff
        /// </summary>
        /// <param name="id">Id of dayOff</param>
        /// <returns>A dayOff within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the dayOff is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _dayOffService.Delete(id);
            return NoContent();
        }
    }
}
