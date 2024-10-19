using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.LevelServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Levels;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class LevelController : BaseApiController
    {
        private readonly ILevelService _levelService;
        public LevelController(ILevelService levelService)
        {
            _levelService = levelService;
        }

        /// <summary>
        /// Endpoint for get all level with condition
        /// </summary>
        /// <param name="searchLevelModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of level</returns>
        /// <response code="200">Returns the list of level</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetLevelModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<LevelEnum.LevelSort> paginationModel,
            [FromQuery] SearchLevelModel searchLevelModel)
        {
            var (levels, total) = await _levelService.GetAll(paginationModel, searchLevelModel);

            return Ok(new ModelsResponse<GetLevelModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: levels
                ));
        }

        /// <summary>
        /// Endpoint for get level by Id
        /// </summary>
        /// <param name="id">Id of level</param>
        /// <returns>List of level</returns>
        /// <response code="200">Returns the level</response>
        /// <response code="404">Returns if the level is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetLevelModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetLevelModel>(
                    data: await _levelService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create level
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a level</param>
        /// <returns>A level within status 201 or error status</returns>
        /// <response code="201">Returns the level</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetLevelModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateLevelModel requestBody)
        {
            return Ok(new BaseResponse<GetLevelModel>(
                    statusCode: 201, data: await _levelService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for level edit level
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a level</param>
        /// <returns>A level within status 200 or error status</returns>
        /// <response code="200">Returns level after update</response>
        /// <response code="404">Returns if the level is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetLevelModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateLevelModel requestBody)
        {
            return Ok(new BaseResponse<GetLevelModel>(
                    data: await _levelService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for level delete a level
        /// </summary>
        /// <param name="id">Id of level</param>
        /// <returns>A level within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the level is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _levelService.Delete(id);
            return NoContent();
        }
    }
}
