using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.BookingServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Bookings;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class BookingController : BaseApiController
    {
        private readonly IBookingService _bookingService;
        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        /// <summary>
        /// Endpoint for get all booking with condition
        /// </summary>
        /// <param name="searchBookingModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of booking</returns>
        /// <response code="200">Returns the list of booking</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetBookingModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<BookingEnum.BookingSort> paginationModel,
            [FromQuery] SearchBookingModel searchBookingModel)
        {
            var (bookings, total) = await _bookingService.GetAll(paginationModel, searchBookingModel);

            return Ok(new ModelsResponse<GetBookingModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: bookings
                ));
        }

        /// <summary>
        /// Endpoint for get booking by Id
        /// </summary>
        /// <param name="id">Id of booking</param>
        /// <returns>List of booking</returns>
        /// <response code="200">Returns the booking</response>
        /// <response code="404">Returns if the booking is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetBookingModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetBookingModel>(
                    data: await _bookingService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create booking
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a booking</param>
        /// <returns>A booking within status 201 or error status</returns>
        /// <response code="201">Returns the booking</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetBookingModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateBookingModel requestBody)
        {
            return Ok(new BaseResponse<GetBookingModel>(
                    statusCode: 201, data: await _bookingService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for booking edit booking
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a booking</param>
        /// <returns>A booking within status 200 or error status</returns>
        /// <response code="200">Returns booking after update</response>
        /// <response code="404">Returns if the booking is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetBookingModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateBookingModel requestBody)
        {
            return Ok(new BaseResponse<GetBookingModel>(
                    data: await _bookingService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for booking delete a booking
        /// </summary>
        /// <param name="id">Id of booking</param>
        /// <returns>A booking within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the booking is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _bookingService.Delete(id);
            return NoContent();
        }
    }
}
