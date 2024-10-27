using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.ComboServiceServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.ComboServices;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class ComboServiceController : BaseApiController
    {
        private readonly IComboServiceService _comboServiceService;
        public ComboServiceController(IComboServiceService comboServiceService)
        {
            _comboServiceService = comboServiceService;
        }

        /// <summary>
        /// Endpoint for get all comboService with condition
        /// </summary>
        /// <param name="searchComboServiceModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of comboService</returns>
        /// <response code="200">Returns the list of comboService</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetDetailComboServiceModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<ComboServiceEnum.ComboServiceSort> paginationModel,
            [FromQuery] SearchComboServiceModel searchComboServiceModel)
        {
            var (comboServices, total) = await _comboServiceService.GetAll(paginationModel, searchComboServiceModel);

            return Ok(new ModelsResponse<GetDetailComboServiceModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: comboServices
                ));
        }

        /// <summary>
        /// Endpoint for get comboService by Id
        /// </summary>
        /// <param name="id">Id of comboService</param>
        /// <returns>List of comboService</returns>
        /// <response code="200">Returns the comboService</response>
        /// <response code="404">Returns if the comboService is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetDetailComboServiceModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetDetailComboServiceModel>(
                    data: await _comboServiceService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create comboService
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a comboService</param>
        /// <returns>A comboService within status 201 or error status</returns>
        /// <response code="201">Returns the comboService</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetComboServiceModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateComboServiceModel requestBody)
        {
            return Ok(new BaseResponse<GetComboServiceModel>(
                    statusCode: 201, data: await _comboServiceService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for comboService edit comboService
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a comboService</param>
        /// <returns>A comboService within status 200 or error status</returns>
        /// <response code="200">Returns comboService after update</response>
        /// <response code="404">Returns if the comboService is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetComboServiceModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateComboServiceModel requestBody)
        {
            return Ok(new BaseResponse<GetComboServiceModel>(
                    data: await _comboServiceService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for comboService delete a comboService
        /// </summary>
        /// <param name="id">Id of comboService</param>
        /// <returns>A comboService within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the comboService is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _comboServiceService.Delete(id);
            return NoContent();
        }
    }
}
