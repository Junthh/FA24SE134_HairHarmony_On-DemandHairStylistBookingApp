using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.KpiServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Kpis;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class KpiController : BaseApiController
    {
        private readonly IKpiService _kpiService;
        public KpiController(IKpiService kpiService)
        {
            _kpiService = kpiService;
        }

        /// <summary>
        /// Endpoint for get all kpi with condition
        /// </summary>
        /// <param name="searchKpiModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of kpi</returns>
        /// <response code="200">Returns the list of kpi</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetKpiModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<KpiEnum.KpiSort> paginationModel,
            [FromQuery] SearchKpiModel searchKpiModel)
        {
            var (kpis, total) = await _kpiService.GetAll(paginationModel, searchKpiModel);

            return Ok(new ModelsResponse<GetKpiModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: kpis
                ));
        }

        /// <summary>
        /// Endpoint for get kpi by Id
        /// </summary>
        /// <param name="id">Id of kpi</param>
        /// <returns>List of kpi</returns>
        /// <response code="200">Returns the kpi</response>
        /// <response code="404">Returns if the kpi is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetKpiModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetKpiModel>(
                    data: await _kpiService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create kpi
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a kpi</param>
        /// <returns>A kpi within status 201 or error status</returns>
        /// <response code="201">Returns the kpi</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetKpiModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateKpiModel requestBody)
        {
            return Ok(new BaseResponse<GetKpiModel>(
                    statusCode: 201, data: await _kpiService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for kpi edit kpi
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a kpi</param>
        /// <returns>A kpi within status 200 or error status</returns>
        /// <response code="200">Returns kpi after update</response>
        /// <response code="404">Returns if the kpi is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetKpiModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateKpiModel requestBody)
        {
            return Ok(new BaseResponse<GetKpiModel>(
                    data: await _kpiService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for kpi delete a kpi
        /// </summary>
        /// <param name="id">Id of kpi</param>
        /// <returns>A kpi within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the kpi is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _kpiService.Delete(id);
            return NoContent();
        }
    }
}
