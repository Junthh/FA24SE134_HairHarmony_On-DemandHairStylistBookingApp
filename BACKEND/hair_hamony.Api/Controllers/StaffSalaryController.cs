using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.StaffSalaryServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.StaffSalarys;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class StaffSalaryController : BaseApiController
    {
        private readonly IStaffSalaryService _staffSalaryService;
        public StaffSalaryController(IStaffSalaryService staffSalaryService)
        {
            _staffSalaryService = staffSalaryService;
        }

        /// <summary>
        /// Endpoint for get all staffSalary with condition
        /// </summary>
        /// <param name="searchStaffSalaryModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <param name="staffName">A fullname of staff</param>
        /// <returns>List of staffSalary</returns>
        /// <response code="200">Returns the list of staffSalary</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetDetailStaffSalaryModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<StaffSalaryEnum.StaffSalarySort> paginationModel,
            [FromQuery] SearchStaffSalaryModel searchStaffSalaryModel,
            [FromQuery] string? staffName)
        {
            var (staffSalarys, total) = await _staffSalaryService
                .GetAll(paginationModel, searchStaffSalaryModel, staffName);

            return Ok(new ModelsResponse<GetDetailStaffSalaryModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: staffSalarys
                ));
        }

        /// <summary>
        /// Endpoint for get staffSalary by Id
        /// </summary>
        /// <param name="id">Id of staffSalary</param>
        /// <returns>List of staffSalary</returns>
        /// <response code="200">Returns the staffSalary</response>
        /// <response code="404">Returns if the staffSalary is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStaffSalaryModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetStaffSalaryModel>(
                    data: await _staffSalaryService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create staffSalary
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a staffSalary</param>
        /// <returns>A staffSalary within status 201 or error status</returns>
        /// <response code="201">Returns the staffSalary</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetStaffSalaryModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateStaffSalaryModel requestBody)
        {
            return Ok(new BaseResponse<GetStaffSalaryModel>(
                    statusCode: 201, data: await _staffSalaryService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for staffSalary edit staffSalary
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a staffSalary</param>
        /// <returns>A staffSalary within status 200 or error status</returns>
        /// <response code="200">Returns staffSalary after update</response>
        /// <response code="404">Returns if the staffSalary is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStaffSalaryModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateStaffSalaryModel requestBody)
        {
            return Ok(new BaseResponse<GetStaffSalaryModel>(
                    data: await _staffSalaryService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for staffSalary delete a staffSalary
        /// </summary>
        /// <param name="id">Id of staffSalary</param>
        /// <returns>A staffSalary within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the staffSalary is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _staffSalaryService.Delete(id);
            return NoContent();
        }
    }
}
