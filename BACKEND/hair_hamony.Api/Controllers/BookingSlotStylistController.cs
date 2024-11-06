using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.BookingSlotStylistServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.BookingSlotStylists;
using hair_hamony.Business.ViewModels.Stylists;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class BookingSlotStylistController : BaseApiController
    {
        private readonly IBookingSlotStylistService _bookingSlotStylistService;
        public BookingSlotStylistController(IBookingSlotStylistService bookingSlotStylistService)
        {
            _bookingSlotStylistService = bookingSlotStylistService;
        }

        /// <summary>
        /// Endpoint for get all bookingSlotStylist with condition
        /// </summary>
        /// <param name="searchBookingSlotStylistModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of bookingSlotStylist</returns>
        /// <response code="200">Returns the list of bookingSlotStylist</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetBookingSlotStylistModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<BookingSlotStylistEnum.BookingSlotStylistSort> paginationModel,
            [FromQuery] SearchBookingSlotStylistModel searchBookingSlotStylistModel)
        {
            var (bookingSlotStylists, total) = await _bookingSlotStylistService.GetAll(paginationModel, searchBookingSlotStylistModel);

            return Ok(new ModelsResponse<GetBookingSlotStylistModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: bookingSlotStylists
                ));
        }

        /// <summary>
        /// Endpoint for get all stylist in freetime
        /// </summary>
        /// <param name="bookingDate">A date of customer booking</param>
        /// <param name="timeSlotId">A slot of customer booking</param>
        /// <returns>List of stylist</returns>
        /// <response code="200">Returns the list of stylist</response>
        [HttpGet("StylistFreetime")]
        [ProducesResponseType(typeof(ModelsResponse<GetStylistModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public IActionResult GetListStylistFreetime(
            [FromQuery] DateOnly bookingDate,
            [FromQuery] Guid timeSlotId)
        {
            var stylists = _bookingSlotStylistService.GetListStylistFreetime(bookingDate, timeSlotId);

            return Ok(new ModelsResponse<GetStylistModel>(
                    paging: new PagingResponse()
                    {
                        Page = 1,
                        Size = stylists.Count,
                        Total = stylists.Count
                    },
                    data: stylists
                ));
        }

        /// <summary>
        /// Endpoint for get bookingSlotStylist by Id
        /// </summary>
        /// <param name="id">Id of bookingSlotStylist</param>
        /// <returns>List of bookingSlotStylist</returns>
        /// <response code="200">Returns the bookingSlotStylist</response>
        /// <response code="404">Returns if the bookingSlotStylist is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetBookingSlotStylistModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetBookingSlotStylistModel>(
                    data: await _bookingSlotStylistService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create bookingSlotStylist
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a bookingSlotStylist</param>
        /// <returns>A bookingSlotStylist within status 201 or error status</returns>
        /// <response code="201">Returns the bookingSlotStylist</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetBookingSlotStylistModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateBookingSlotStylistModel requestBody)
        {
            return Ok(new BaseResponse<GetBookingSlotStylistModel>(
                    statusCode: 201, data: await _bookingSlotStylistService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for bookingSlotStylist edit bookingSlotStylist
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a bookingSlotStylist</param>
        /// <returns>A bookingSlotStylist within status 200 or error status</returns>
        /// <response code="200">Returns bookingSlotStylist after update</response>
        /// <response code="404">Returns if the bookingSlotStylist is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetBookingSlotStylistModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateBookingSlotStylistModel requestBody)
        {
            return Ok(new BaseResponse<GetBookingSlotStylistModel>(
                    data: await _bookingSlotStylistService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for bookingSlotStylist delete a bookingSlotStylist
        /// </summary>
        /// <param name="id">Id of bookingSlotStylist</param>
        /// <returns>A bookingSlotStylist within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the bookingSlotStylist is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _bookingSlotStylistService.Delete(id);
            return NoContent();
        }
    }
}
