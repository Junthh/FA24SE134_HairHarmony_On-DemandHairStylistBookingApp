using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.BookingDetailServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.BookingDetails;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class BookingDetailController : BaseApiController
    {
        private readonly IBookingDetailService _bookingDetailService;
        public BookingDetailController(IBookingDetailService bookingDetailService)
        {
            _bookingDetailService = bookingDetailService;
        }

        /// <summary>
        /// Endpoint for get all bookingDetail with condition
        /// </summary>
        /// <param name="searchBookingDetailModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of bookingDetail</returns>
        /// <response code="200">Returns the list of bookingDetail</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetBookingDetailModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<BookingDetailEnum.BookingDetailSort> paginationModel,
            [FromQuery] SearchBookingDetailModel searchBookingDetailModel)
        {
            var (bookingDetails, total) = await _bookingDetailService.GetAll(paginationModel, searchBookingDetailModel);

            return Ok(new ModelsResponse<GetBookingDetailModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: bookingDetails
                ));
        }

        /// <summary>
        /// Endpoint for get bookingDetail by Id
        /// </summary>
        /// <param name="id">Id of bookingDetail</param>
        /// <returns>List of bookingDetail</returns>
        /// <response code="200">Returns the bookingDetail</response>
        /// <response code="404">Returns if the bookingDetail is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetBookingDetailModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetBookingDetailModel>(
                    data: await _bookingDetailService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create bookingDetail
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a bookingDetail</param>
        /// <returns>A bookingDetail within status 201 or error status</returns>
        /// <response code="201">Returns the bookingDetail</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetBookingDetailModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateBookingDetailModel requestBody)
        {
            return Ok(new BaseResponse<GetBookingDetailModel>(
                    statusCode: 201, data: await _bookingDetailService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for bookingDetail edit bookingDetail
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a bookingDetail</param>
        /// <returns>A bookingDetail within status 200 or error status</returns>
        /// <response code="200">Returns bookingDetail after update</response>
        /// <response code="404">Returns if the bookingDetail is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetBookingDetailModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateBookingDetailModel requestBody)
        {
            return Ok(new BaseResponse<GetBookingDetailModel>(
                    data: await _bookingDetailService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for bookingDetail delete a bookingDetail
        /// </summary>
        /// <param name="id">Id of bookingDetail</param>
        /// <returns>A bookingDetail within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the bookingDetail is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _bookingDetailService.Delete(id);
            return NoContent();
        }
    }
}
