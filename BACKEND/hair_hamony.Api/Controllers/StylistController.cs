﻿using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.StylistServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Stylists;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class StylistController : BaseApiController
    {
        private readonly IStylistService _stylistService;
        public StylistController(IStylistService stylistService)
        {
            _stylistService = stylistService;
        }

        /// <summary>
        /// Endpoint for get all stylist with condition
        /// </summary>
        /// <param name="searchStylistModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of stylist</returns>
        /// <response code="200">Returns the list of stylist</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetStylistModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<StylistEnum.StylistSort> paginationModel,
            [FromQuery] SearchStylistModel searchStylistModel)
        {
            var (stylists, total) = await _stylistService.GetAll(paginationModel, searchStylistModel);

            return Ok(new ModelsResponse<GetStylistModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: stylists
                ));
        }

        /// <summary>
        /// Endpoint for get stylist by Id
        /// </summary>
        /// <param name="id">Id of stylist</param>
        /// <returns>List of stylist</returns>
        /// <response code="200">Returns the stylist</response>
        /// <response code="404">Returns if the stylist is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStylistModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetStylistModel>(
                    data: await _stylistService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create stylist
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a stylist</param>
        /// <returns>A stylist within status 201 or error status</returns>
        /// <response code="201">Returns the stylist</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetStylistModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(CreateStylistModel requestBody)
        {
            return Ok(new BaseResponse<GetStylistModel>(
                    statusCode: 201, data: await _stylistService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for stylist edit stylist
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a stylist</param>
        /// <returns>A stylist within status 200 or error status</returns>
        /// <response code="200">Returns stylist after update</response>
        /// <response code="404">Returns if the stylist is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetStylistModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, UpdateStylistModel requestBody)
        {
            return Ok(new BaseResponse<GetStylistModel>(
                    data: await _stylistService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for stylist delete a stylist
        /// </summary>
        /// <param name="id">Id of stylist</param>
        /// <returns>A stylist within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the stylist is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _stylistService.Delete(id);
            return NoContent();
        }
    }
}
