using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.NewsServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.News;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class NewController : BaseApiController
    {
        private readonly INewsService _newsService;
        public NewController(INewsService newsService)
        {
            _newsService = newsService;
        }

        /// <summary>
        /// Endpoint for get all news with condition
        /// </summary>
        /// <param name="searchNewsModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of news</returns>
        /// <response code="200">Returns the list of news</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetNewsModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<NewsEnum.NewsSort> paginationModel,
            [FromQuery] SearchNewsModel searchNewsModel)
        {
            var (newss, total) = await _newsService.GetAll(paginationModel, searchNewsModel);

            return Ok(new ModelsResponse<GetNewsModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: newss
                ));
        }

        /// <summary>
        /// Endpoint for get news by Id
        /// </summary>
        /// <param name="id">Id of news</param>
        /// <returns>List of news</returns>
        /// <response code="200">Returns the news</response>
        /// <response code="404">Returns if the news is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetNewsModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetNewsModel>(
                    data: await _newsService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create news
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a news</param>
        /// <returns>A news within status 201 or error status</returns>
        /// <response code="201">Returns the news</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetNewsModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateNewsModel requestBody)
        {
            return Ok(new BaseResponse<GetNewsModel>(
                    statusCode: 201, data: await _newsService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for news edit news
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a news</param>
        /// <returns>A news within status 200 or error status</returns>
        /// <response code="200">Returns news after update</response>
        /// <response code="404">Returns if the news is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetNewsModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateNewsModel requestBody)
        {
            return Ok(new BaseResponse<GetNewsModel>(
                    data: await _newsService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for news delete a news
        /// </summary>
        /// <param name="id">Id of news</param>
        /// <returns>A news within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the news is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _newsService.Delete(id);
            return NoContent();
        }
    }
}
