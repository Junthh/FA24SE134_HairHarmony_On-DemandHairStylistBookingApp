﻿using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.CustomerServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Customers;
using hair_hamony.Business.ViewModels.Users;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class CustomerController : BaseApiController
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        /// <summary>
        /// Endpoint for customer login
        /// </summary>
        /// <returns>Token of customer</returns>
        /// <response code="200">Returns a token of customer</response>
        [HttpPost("login")]
        [ProducesResponseType(typeof(ModelLoginResponse<GetCustomerModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> Login(CustomerLoginModel requestBody)
        {
            var (token, customer) = await _customerService.Login(requestBody);
            return Ok(new ModelLoginResponse<GetCustomerModel>(
                new ModelDataLoginResponse<GetCustomerModel>(token, customer)
            ));
        }

        /// <summary>
        /// Endpoint for customer change password
        /// </summary>
        /// <returns>A customer information</returns>
        /// <response code="200">Returns a customer information</response>
        [HttpPut("{id}/changePassword")]
        [ProducesResponseType(typeof(BaseResponse<GetCustomerModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> ChangePassword(Guid id, [FromForm] UpdatePasswordModel requestBody)
        {
            return Ok(new BaseResponse<GetCustomerModel>(
                    data: await _customerService.ChangePassword(id, requestBody.OldPassword, requestBody.NewPassword)
                ));
        }

        /// <summary>
        /// Endpoint for get all customer with condition
        /// </summary>
        /// <param name="searchCustomerModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of customer</returns>
        /// <response code="200">Returns the list of customer</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetCustomerModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<CustomerEnum.CustomerSort> paginationModel,
            [FromQuery] SearchCustomerModel searchCustomerModel)
        {
            var (customers, total) = await _customerService.GetAll(paginationModel, searchCustomerModel);

            return Ok(new ModelsResponse<GetCustomerModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: customers
                ));
        }

        /// <summary>
        /// Endpoint for get customer by Id
        /// </summary>
        /// <param name="id">Id of customer</param>
        /// <returns>List of customer</returns>
        /// <response code="200">Returns the customer</response>
        /// <response code="404">Returns if the customer is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetCustomerModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetCustomerModel>(
                    data: await _customerService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create customer
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a customer</param>
        /// <returns>A customer within status 201 or error status</returns>
        /// <response code="201">Returns the customer</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetCustomerModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromForm] CreateCustomerModel requestBody)
        {
            return Ok(new BaseResponse<GetCustomerModel>(
                    statusCode: 201, data: await _customerService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for customer edit customer
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a customer</param>
        /// <returns>A customer within status 200 or error status</returns>
        /// <response code="200">Returns customer after update</response>
        /// <response code="404">Returns if the customer is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetCustomerModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdateCustomerModel requestBody)
        {
            return Ok(new BaseResponse<GetCustomerModel>(
                    data: await _customerService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for customer delete a customer
        /// </summary>
        /// <param name="id">Id of customer</param>
        /// <returns>A customer within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the customer is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _customerService.Delete(id);
            return NoContent();
        }

        public class UpdatePasswordModel
        {
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
        }
    }
}
