﻿using hair_hamony.API.Controllers;
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
        /// <param name="customerPhoneNumber">An phone number of customer</param>
        /// <param name="stylistId">An id of stylist</param>
        /// <param name="startDate">An start date wanna search with date booking</param>
        /// <param name="endDate">An end date wanna search with date booking</param>
        /// <returns>List of booking</returns>
        /// <response code="200">Returns the list of booking</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetDetailBookingModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<BookingEnum.BookingSort> paginationModel,
            [FromQuery] SearchBookingModel searchBookingModel,
            [FromQuery] string? customerPhoneNumber,
            [FromQuery] Guid? stylistId,
            [FromQuery] DateOnly? startDate,
            [FromQuery] DateOnly? endDate
        )
        {
            var (bookings, total) = await _bookingService.GetAll(
                paginationModel,
                searchBookingModel,
                customerPhoneNumber,
                stylistId,
                startDate, endDate
            );

            return Ok(new ModelsResponse<GetDetailBookingModel>(
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
        /// Endpoint for get revenue of booking by month
        /// </summary>
        /// <returns>Renenue of booking by month</returns>
        /// <response code="200">Returns revenue of booking by month</response>
        [HttpGet("TotalRevenueByMonth")]
        [ProducesResponseType(typeof(BaseResponse<GetTotalRevenueByMonthModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetTotalRevenueByMonth(
            [FromQuery] int year, [FromQuery] int month
        )
        {
            var result = await _bookingService.GetTotalRevenueByMonth(year, month);

            return Ok(new BaseResponse<GetTotalRevenueByMonthModel>(data: result));
        }

        /// <summary>
        /// Endpoint for count booking with each status
        /// </summary>
        /// <returns>Count booking with each status</returns>
        /// <response code="200">Returns count booking with each status</response>
        [HttpGet("CountByStatus")]
        [ProducesResponseType(typeof(BaseResponse<GetBookingByStatusModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public IActionResult GetTotalBookingByStatus()
        {
            var result = _bookingService.GetTotalBookingByStatus();

            return Ok(new BaseResponse<GetBookingByStatusModel>(data: result));
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
        /// Endpoint for create payment url
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a booking</param>
        /// <returns>A booking within status 200 or error status</returns>
        /// <response code="200">Returns the payment url</response>
        [HttpPost("PayWithVnPay/{id}")]
        [ProducesResponseType(typeof(BaseResponse<object>), StatusCodes.Status201Created)]
        public IActionResult PayWithVnPay(Guid id, UpdateBookingModel requestBody)
        {
            var url = _bookingService.PayWithVnpay(id, requestBody);
            return Ok(new BaseResponse<object>(data: new { url }));
        }

        /// <summary>
        /// Endpoint for confirm pay with vnpay
        /// </summary>
        /// <returns>A booking within status 200 or error status</returns>
        /// <response code="200">Returns status of payment</response>
        [HttpGet("ConfirmPayWithVnPay")]
        [ProducesResponseType(typeof(BaseResponse<object>), StatusCodes.Status201Created)]
        public async Task<IActionResult> ConfirmPayWithVnpay()
        {
            var status = await _bookingService.ConfirmPayWithVnpay(Request);
            return Redirect($"https://thankful-bay-0690dca0f.5.azurestaticapps.net/schedule-list?status={status}");
            //return Redirect($"http://localhost:3000/schedule-list?status={status}");
        }

        /// <summary>
        /// Endpoint for init flow booking
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a booking</param>
        /// <returns>A booking within status 201 or error status</returns>
        /// <response code="201">Returns the booking</response>
        [HttpPost("Init")]
        [ProducesResponseType(typeof(BaseResponse<GetBookingModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Init(CreateInitBookingModel requestBody)
        {
            return Ok(new BaseResponse<GetBookingModel>(
                    statusCode: 201, data: await _bookingService.Init(requestBody),
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
