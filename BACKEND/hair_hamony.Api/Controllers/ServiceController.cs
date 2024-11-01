using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.ServiceServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Services;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class ServiceController : BaseApiController
    {
        private readonly IServiceService _serviceService;
        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        /// <summary>
        /// Endpoint for get all service with condition
        /// </summary>
        /// <param name="searchServiceModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of service</returns>
        /// <response code="200">Returns the list of service</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetServiceModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<ServiceEnum.ServiceSort> paginationModel,
            [FromQuery] SearchServiceModel searchServiceModel)
        {
            var (services, total) = await _serviceService.GetAll(paginationModel, searchServiceModel);

            return Ok(new ModelsResponse<GetServiceModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: services
                ));
        }

        /// <summary>
        /// Endpoint for get service by Id
        /// </summary>
        /// <param name="id">Id of service</param>
        /// <returns>List of service</returns>
        /// <response code="200">Returns the service</response>
        /// <response code="404">Returns if the service is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetServiceModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetServiceModel>(
                    data: await _serviceService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create service
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a service</param>
        /// <returns>A service within status 201 or error status</returns>
        /// <response code="201">Returns the service</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetServiceModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromForm] CreateServiceModel requestBody)
        {
            return Ok(new BaseResponse<GetServiceModel>(
                    statusCode: 201, data: await _serviceService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for service edit service
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a service</param>
        /// <returns>A service within status 200 or error status</returns>
        /// <response code="200">Returns service after update</response>
        /// <response code="404">Returns if the service is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetServiceModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdateServiceModel requestBody)
        {
            return Ok(new BaseResponse<GetServiceModel>(
                    data: await _serviceService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for service delete a service
        /// </summary>
        /// <param name="id">Id of service</param>
        /// <returns>A service within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the service is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _serviceService.Delete(id);
            return NoContent();
        }
    }
}
