using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.StaffServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Staffs;
using hair_hamony.Business.ViewModels.Users;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class StaffController : BaseApiController
    {
        private readonly IStaffService _staffService;
        public StaffController(IStaffService staffService)
        {
            _staffService = staffService;
        }

        /// <summary>
        /// Endpoint for staff login
        /// </summary>
        /// <returns>Token of staff</returns>
        /// <response code="200">Returns a token of staff</response>
        [HttpPost("login")]
        [ProducesResponseType(typeof(ModelLoginResponse<GetStaffModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> Login(UserLoginModel requestBody)
        {
            var (token, staff) = await _staffService.Login(requestBody);
            return Ok(new ModelLoginResponse<GetStaffModel>(
                new ModelDataLoginResponse<GetStaffModel>(token, staff)
            ));
        }

        /// <summary>
        /// Endpoint for staff change password
        /// </summary>
        /// <returns>A staff information</returns>
        /// <response code="200">Returns a staff information</response>
        [HttpPut("{id}/changePassword")]
        [ProducesResponseType(typeof(BaseResponse<GetStaffModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> ChangePassword(Guid id, string oldPassword, string newPassword)
        {
            return Ok(new BaseResponse<GetStaffModel>(
                    data: await _staffService.ChangePassword(id, oldPassword, newPassword)
                ));
        }

        /// <summary>
        /// Endpoint for get all staff with condition
        /// </summary>
        /// <param name="searchStaffModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of staff</returns>
        /// <response code="200">Returns the list of staff</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetStaffModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<StaffEnum.StaffSort> paginationModel,
            [FromQuery] SearchStaffModel searchStaffModel)
        {
            var (staffs, total) = await _staffService.GetAll(paginationModel, searchStaffModel);

            return Ok(new ModelsResponse<GetStaffModel>(
                    paging: new PagingResponse
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: staffs
                ));
        }

        /// <summary>
        /// Endpoint for get staff by Id
        /// </summary>
        /// <param name="id">Id of staff</param>
        /// <returns>List of staff</returns>
        /// <response code="200">Returns the staff</response>
        /// <response code="404">Returns if the staff is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStaffModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetStaffModel>(
                    data: await _staffService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create staff
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a staff</param>
        /// <returns>A staff within status 201 or error status</returns>
        /// <response code="201">Returns the staff</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetStaffModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateStaffModel requestBody)
        {
            return Ok(new BaseResponse<GetStaffModel>(
                    statusCode: 201, data: await _staffService.Create(requestBody), msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for staff edit staff
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a staff</param>
        /// <returns>A staff within status 200 or error status</returns>
        /// <response code="200">Returns staff after update</response>
        /// <response code="404">Returns if the staff is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStaffModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateStaffModel requestBody)
        {
            return Ok(new BaseResponse<GetStaffModel>(
                    data: await _staffService.Update(id, requestBody), msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for staff delete a staff
        /// </summary>
        /// <param name="id">Id of staff</param>
        /// <returns>A staff within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the staff is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _staffService.Delete(id);
            return NoContent();
        }
    }
}
