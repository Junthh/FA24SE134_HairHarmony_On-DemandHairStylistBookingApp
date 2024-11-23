using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.OwnerServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Owners;
using hair_hamony.Business.ViewModels.Users;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class OwnerController : BaseApiController
    {
        private readonly IOwnerService _ownerService;
        public OwnerController(IOwnerService ownerService)
        {
            _ownerService = ownerService;
        }

        /// <summary>
        /// Endpoint for owner login
        /// </summary>
        /// <returns>Token of owner</returns>
        /// <response code="200">Returns a token of owner</response>
        [HttpPost("login")]
        [ProducesResponseType(typeof(ModelLoginResponse<GetOwnerModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> Login(UserLoginModel requestBody)
        {
            var (token, owner) = await _ownerService.Login(requestBody);
            return Ok(new ModelLoginResponse<GetOwnerModel>(
                new ModelDataLoginResponse<GetOwnerModel>(token, owner)
            ));
        }

        /// <summary>
        /// Endpoint for owner change password
        /// </summary>
        /// <returns>A owner information</returns>
        /// <response code="200">Returns a owner information</response>
        [HttpPut("{id}/changePassword")]
        [ProducesResponseType(typeof(BaseResponse<GetOwnerModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> ChangePassword(Guid id, [FromForm] UpdatePasswordModel requestBody)
        {
            return Ok(new BaseResponse<GetOwnerModel>(
                    data: await _ownerService.ChangePassword(id, requestBody.OldPassword, requestBody.NewPassword)
                ));
        }

        /// <summary>
        /// Endpoint for get all owner with condition
        /// </summary>
        /// <param name="searchOwnerModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of owner</returns>
        /// <response code="200">Returns the list of owner</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetOwnerModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<OwnerEnum.OwnerSort> paginationModel,
            [FromQuery] SearchOwnerModel searchOwnerModel)
        {
            var (owners, total) = await _ownerService.GetAll(paginationModel, searchOwnerModel);

            return Ok(new ModelsResponse<GetOwnerModel>(
                    paging: new PagingResponse
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: owners
                ));
        }

        /// <summary>
        /// Endpoint for get owner by Id
        /// </summary>
        /// <param name="id">Id of owner</param>
        /// <returns>List of owner</returns>
        /// <response code="200">Returns the owner</response>
        /// <response code="404">Returns if the owner is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetOwnerModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetOwnerModel>(
                    data: await _ownerService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create owner
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a owner</param>
        /// <returns>A owner within status 201 or error status</returns>
        /// <response code="201">Returns the owner</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetOwnerModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromForm] CreateOwnerModel requestBody)
        {
            return Ok(new BaseResponse<GetOwnerModel>(
                    statusCode: 201, data: await _ownerService.Create(requestBody), msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for owner edit owner
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a owner</param>
        /// <returns>A owner within status 200 or error status</returns>
        /// <response code="200">Returns owner after update</response>
        /// <response code="404">Returns if the owner is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetOwnerModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdateOwnerModel requestBody)
        {
            return Ok(new BaseResponse<GetOwnerModel>(
                    data: await _ownerService.Update(id, requestBody), msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for owner delete a owner
        /// </summary>
        /// <param name="id">Id of owner</param>
        /// <returns>A owner within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the owner is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _ownerService.Delete(id);
            return NoContent();
        }

        public class UpdatePasswordModel
        {
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
        }
    }
}
