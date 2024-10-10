using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.RoleServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Roles;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class RoleController : BaseApiController
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        /// <summary>
        /// Endpoint for get all role with condition
        /// </summary>
        /// <param name="searchRoleModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of role</returns>
        /// <response code="200">Returns the list of role</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetRoleModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<RoleEnum.RoleSort> paginationModel,
            [FromQuery] SearchRoleModel searchRoleModel)
        {
            var (roles, total) = await _roleService.GetAll(paginationModel, searchRoleModel);

            return Ok(new ModelsResponse<GetRoleModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: roles
                ));
        }

        /// <summary>
        /// Endpoint for get role by Id
        /// </summary>
        /// <param name="id">Id of role</param>
        /// <returns>List of role</returns>
        /// <response code="200">Returns the role</response>
        /// <response code="404">Returns if the role is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetRoleModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetRoleModel>(
                    data: await _roleService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create role
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a role</param>
        /// <returns>A role within status 201 or error status</returns>
        /// <response code="201">Returns the role</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetRoleModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateRoleModel requestBody)
        {
            return Ok(new BaseResponse<GetRoleModel>(
                    statusCode: 201, data: await _roleService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for role edit role
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a role</param>
        /// <returns>A role within status 200 or error status</returns>
        /// <response code="200">Returns role after update</response>
        /// <response code="404">Returns if the role is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetRoleModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateRoleModel requestBody)
        {
            return Ok(new BaseResponse<GetRoleModel>(
                    data: await _roleService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for role delete a role
        /// </summary>
        /// <param name="id">Id of role</param>
        /// <returns>A role within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the role is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _roleService.Delete(id);
            return NoContent();
        }
    }
}
