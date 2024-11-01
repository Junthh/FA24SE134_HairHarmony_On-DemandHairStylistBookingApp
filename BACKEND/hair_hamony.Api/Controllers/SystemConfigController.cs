using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.SystemConfigServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.SystemConfigs;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class SystemConfigController : BaseApiController
    {
        private readonly ISystemConfigService _systemConfigService;
        public SystemConfigController(ISystemConfigService systemConfigService)
        {
            _systemConfigService = systemConfigService;
        }

        /// <summary>
        /// Endpoint for get all systemConfig with condition
        /// </summary>
        /// <param name="searchSystemConfigModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of systemConfig</returns>
        /// <response code="200">Returns the list of systemConfig</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetSystemConfigModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<SystemConfigEnum.SystemConfigSort> paginationModel,
            [FromQuery] SearchSystemConfigModel searchSystemConfigModel)
        {
            var (systemConfigs, total) = await _systemConfigService.GetAll(paginationModel, searchSystemConfigModel);

            return Ok(new ModelsResponse<GetSystemConfigModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: systemConfigs
                ));
        }

        /// <summary>
        /// Endpoint for get systemConfig by Id
        /// </summary>
        /// <param name="id">Id of systemConfig</param>
        /// <returns>List of systemConfig</returns>
        /// <response code="200">Returns the systemConfig</response>
        /// <response code="404">Returns if the systemConfig is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetSystemConfigModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetSystemConfigModel>(
                    data: await _systemConfigService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create systemConfig
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a systemConfig</param>
        /// <returns>A systemConfig within status 201 or error status</returns>
        /// <response code="201">Returns the systemConfig</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetSystemConfigModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateSystemConfigModel requestBody)
        {
            return Ok(new BaseResponse<GetSystemConfigModel>(
                    statusCode: 201, data: await _systemConfigService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for systemConfig edit systemConfig
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a systemConfig</param>
        /// <returns>A systemConfig within status 200 or error status</returns>
        /// <response code="200">Returns systemConfig after update</response>
        /// <response code="404">Returns if the systemConfig is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetSystemConfigModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateSystemConfigModel requestBody)
        {
            return Ok(new BaseResponse<GetSystemConfigModel>(
                    data: await _systemConfigService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for systemConfig delete a systemConfig
        /// </summary>
        /// <param name="id">Id of systemConfig</param>
        /// <returns>A systemConfig within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the systemConfig is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _systemConfigService.Delete(id);
            return NoContent();
        }
    }
}
