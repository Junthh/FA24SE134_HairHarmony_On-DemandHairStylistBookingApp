using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.StylistSalaryServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.StylistSalarys;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class StylistSalaryController : BaseApiController
    {
        private readonly IStylistSalaryService _stylistSalaryService;
        public StylistSalaryController(IStylistSalaryService stylistSalaryService)
        {
            _stylistSalaryService = stylistSalaryService;
        }

        /// <summary>
        /// Endpoint for get all stylistSalary with condition
        /// </summary>
        /// <param name="searchStylistSalaryModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of stylistSalary</returns>
        /// <response code="200">Returns the list of stylistSalary</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetDetailStylistSalaryModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<StylistSalaryEnum.StylistSalarySort> paginationModel,
            [FromQuery] SearchStylistSalaryModel searchStylistSalaryModel)
        {
            var (stylistSalarys, total) = await _stylistSalaryService.GetAll(paginationModel, searchStylistSalaryModel);

            return Ok(new ModelsResponse<GetDetailStylistSalaryModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: stylistSalarys
                ));
        }

        /// <summary>
        /// Endpoint for get stylistSalary by Id
        /// </summary>
        /// <param name="id">Id of stylistSalary</param>
        /// <returns>List of stylistSalary</returns>
        /// <response code="200">Returns the stylistSalary</response>
        /// <response code="404">Returns if the stylistSalary is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStylistSalaryModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetStylistSalaryModel>(
                    data: await _stylistSalaryService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create stylistSalary
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a stylistSalary</param>
        /// <returns>A stylistSalary within status 201 or error status</returns>
        /// <response code="201">Returns the stylistSalary</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetStylistSalaryModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateStylistSalaryModel requestBody)
        {
            return Ok(new BaseResponse<GetStylistSalaryModel>(
                    statusCode: 201, data: await _stylistSalaryService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for stylistSalary edit stylistSalary
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a stylistSalary</param>
        /// <returns>A stylistSalary within status 200 or error status</returns>
        /// <response code="200">Returns stylistSalary after update</response>
        /// <response code="404">Returns if the stylistSalary is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStylistSalaryModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateStylistSalaryModel requestBody)
        {
            return Ok(new BaseResponse<GetStylistSalaryModel>(
                    data: await _stylistSalaryService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for stylistSalary delete a stylistSalary
        /// </summary>
        /// <param name="id">Id of stylistSalary</param>
        /// <returns>A stylistSalary within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the stylistSalary is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _stylistSalaryService.Delete(id);
            return NoContent();
        }
    }
}
