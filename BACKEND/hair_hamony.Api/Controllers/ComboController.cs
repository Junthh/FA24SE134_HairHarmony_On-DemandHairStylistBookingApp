using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.ComboServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Combos;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class ComboController : BaseApiController
    {
        private readonly IComboService _comboService;
        public ComboController(IComboService comboService)
        {
            _comboService = comboService;
        }

        /// <summary>
        /// Endpoint for get all combo with condition
        /// </summary>
        /// <param name="searchComboModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of combo</returns>
        /// <response code="200">Returns the list of combo</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetDetailComboModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<ComboEnum.ComboSort> paginationModel,
            [FromQuery] SearchComboModel searchComboModel)
        {
            var (combos, total) = await _comboService.GetAll(paginationModel, searchComboModel);

            return Ok(new ModelsResponse<GetDetailComboModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: combos
                ));
        }

        /// <summary>
        /// Endpoint for get combo by Id
        /// </summary>
        /// <param name="id">Id of combo</param>
        /// <returns>List of combo</returns>
        /// <response code="200">Returns the combo</response>
        /// <response code="404">Returns if the combo is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetDetailComboModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetDetailComboModel>(
                    data: await _comboService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create combo
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a combo</param>
        /// <returns>A combo within status 201 or error status</returns>
        /// <response code="201">Returns the combo</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetComboModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromForm] CreateComboModel requestBody)
        {
            return Ok(new BaseResponse<GetComboModel>(
                    statusCode: 201, data: await _comboService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for combo edit combo
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a combo</param>
        /// <returns>A combo within status 200 or error status</returns>
        /// <response code="200">Returns combo after update</response>
        /// <response code="404">Returns if the combo is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetComboModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdateComboModel requestBody)
        {
            return Ok(new BaseResponse<GetComboModel>(
                    data: await _comboService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for combo delete a combo
        /// </summary>
        /// <param name="id">Id of combo</param>
        /// <returns>A combo within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the combo is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _comboService.Delete(id);
            return NoContent();
        }
    }
}
