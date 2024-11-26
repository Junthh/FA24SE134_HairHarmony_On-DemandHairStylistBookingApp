using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.FeedbackServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Feedbacks;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class FeedbackController : BaseApiController
    {
        private readonly IFeedbackService _feedbackService;
        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        /// <summary>
        /// Endpoint for get all feedback with condition
        /// </summary>
        /// <param name="searchFeedbackModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of feedback</returns>
        /// <response code="200">Returns the list of feedback</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetDetailFeedbackModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<FeedbackEnum.FeedbackSort> paginationModel,
            [FromQuery] SearchFeedbackModel searchFeedbackModel)
        {
            var (feedbacks, total) = await _feedbackService.GetAll(paginationModel, searchFeedbackModel);

            return Ok(new ModelsResponse<GetDetailFeedbackModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: feedbacks
                ));
        }

        /// <summary>
        /// Endpoint for get feedback by Id
        /// </summary>
        /// <param name="id">Id of feedback</param>
        /// <returns>List of feedback</returns>
        /// <response code="200">Returns the feedback</response>
        /// <response code="404">Returns if the feedback is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetFeedbackModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetFeedbackModel>(
                    data: await _feedbackService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create feedback
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a feedback</param>
        /// <returns>A feedback within status 201 or error status</returns>
        /// <response code="201">Returns the feedback</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetFeedbackModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateFeedbackModel requestBody)
        {
            return Ok(new BaseResponse<GetFeedbackModel>(
                    statusCode: 201, data: await _feedbackService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for feedback edit feedback
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a feedback</param>
        /// <returns>A feedback within status 200 or error status</returns>
        /// <response code="200">Returns feedback after update</response>
        /// <response code="404">Returns if the feedback is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetFeedbackModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateFeedbackModel requestBody)
        {
            return Ok(new BaseResponse<GetFeedbackModel>(
                    data: await _feedbackService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for feedback delete a feedback
        /// </summary>
        /// <param name="id">Id of feedback</param>
        /// <returns>A feedback within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the feedback is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _feedbackService.Delete(id);
            return NoContent();
        }
    }
}
