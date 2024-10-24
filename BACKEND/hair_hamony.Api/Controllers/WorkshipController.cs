using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.WorkshipServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Workships;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class WorkshipController : BaseApiController
    {
        private readonly IWorkshipService _workshipService;
        public WorkshipController(IWorkshipService workshipService)
        {
            _workshipService = workshipService;
        }

        /// <summary>
        /// Endpoint for get all workship with condition
        /// </summary>
        /// <param name="searchWorkshipModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of workship</returns>
        /// <response code="200">Returns the list of workship</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetWorkshipModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<WorkshipEnum.WorkshipSort> paginationModel,
            [FromQuery] SearchWorkshipModel searchWorkshipModel)
        {
            var (workships, total) = await _workshipService.GetAll(paginationModel, searchWorkshipModel);

            return Ok(new ModelsResponse<GetWorkshipModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: workships
                ));
        }

        /// <summary>
        /// Endpoint for get workship by Id
        /// </summary>
        /// <param name="id">Id of workship</param>
        /// <returns>List of workship</returns>
        /// <response code="200">Returns the workship</response>
        /// <response code="404">Returns if the workship is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetWorkshipModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetWorkshipModel>(
                    data: await _workshipService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create workship
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a workship</param>
        /// <returns>A workship within status 201 or error status</returns>
        /// <response code="201">Returns the workship</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetWorkshipModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateWorkshipModel requestBody)
        {
            return Ok(new BaseResponse<GetWorkshipModel>(
                    statusCode: 201, data: await _workshipService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for workship edit workship
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a workship</param>
        /// <returns>A workship within status 200 or error status</returns>
        /// <response code="200">Returns workship after update</response>
        /// <response code="404">Returns if the workship is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetWorkshipModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateWorkshipModel requestBody)
        {
            return Ok(new BaseResponse<GetWorkshipModel>(
                    data: await _workshipService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for workship delete a workship
        /// </summary>
        /// <param name="id">Id of workship</param>
        /// <returns>A workship within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the workship is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _workshipService.Delete(id);
            return NoContent();
        }
    }
}
