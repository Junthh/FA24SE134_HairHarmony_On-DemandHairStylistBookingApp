using hair_hamony.API.Controllers;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.CategoryServices;
using hair_hamony.Business.ViewModels;
using hair_hamony.Business.ViewModels.Categories;
using Microsoft.AspNetCore.Mvc;

namespace home_travel.API.Controllers
{
    public class CategoryController : BaseApiController
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// Endpoint for get all category with condition
        /// </summary>
        /// <param name="searchCategoryModel">An object contains value wanna search</param>
        /// <param name="paginationModel">An object contains paging criteria</param>
        /// <returns>List of category</returns>
        /// <response code="200">Returns the list of category</response>
        [HttpGet]
        [ProducesResponseType(typeof(ModelsResponse<GetCategoryModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public async Task<IActionResult> GetAll(
            [FromQuery] PagingParam<CategoryEnum.CategorySort> paginationModel,
            [FromQuery] SearchCategoryModel searchCategoryModel)
        {
            var (categorys, total) = await _categoryService.GetAll(paginationModel, searchCategoryModel);

            return Ok(new ModelsResponse<GetCategoryModel>(
                    paging: new PagingResponse()
                    {
                        Page = paginationModel.PageIndex,
                        Size = paginationModel.PageSize ?? total,
                        Total = total
                    },
                    data: categorys
                ));
        }

        /// <summary>
        /// Endpoint for get all category with service and combo
        /// </summary>
        /// <returns>List of category with service and combo</returns>
        /// <response code="200">Returns the list of category with service and combo</response>
        [HttpGet("ComboAndService")]
        [ProducesResponseType(typeof(ModelsResponse<GetCategoryOfComboAndServiceModel>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        public IActionResult GetCategoryOfComboAndService()
        {
            var categorys = _categoryService.GetCategoryOfComboAndService();

            return Ok(new ModelsResponse<GetCategoryOfComboAndServiceModel>(
                    paging: new PagingResponse()
                    {
                        Page = 1,
                        Size = categorys.Count,
                        Total = categorys.Count
                    },
                    data: categorys
                ));
        }

        /// <summary>
        /// Endpoint for get category by Id
        /// </summary>
        /// <param name="id">Id of category</param>
        /// <returns>List of category</returns>
        /// <response code="200">Returns the category</response>
        /// <response code="404">Returns if the category is not exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetCategoryModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(new BaseResponse<GetCategoryModel>(
                    data: await _categoryService.GetById(id)
                ));
        }

        /// <summary>
        /// Endpoint for create category
        /// </summary>
        /// <param name="requestBody">An obj contains input info of a category</param>
        /// <returns>A category within status 201 or error status</returns>
        /// <response code="201">Returns the category</response>
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<GetCategoryModel>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromForm] CreateCategoryModel requestBody)
        {
            return Ok(new BaseResponse<GetCategoryModel>(
                    statusCode: 201, data: await _categoryService.Create(requestBody),
                    msg: SuccessMessageResponse.CREATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for category edit category
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requestBody">An obj contains update info of a category</param>
        /// <returns>A category within status 200 or error status</returns>
        /// <response code="200">Returns category after update</response>
        /// <response code="404">Returns if the category is not exist</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BaseResponse<GetCategoryModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdateCategoryModel requestBody)
        {
            return Ok(new BaseResponse<GetCategoryModel>(
                    data: await _categoryService.Update(id, requestBody),
                    msg: SuccessMessageResponse.UPDATED_REQUEST
                ));
        }

        /// <summary>
        /// Endpoint for category delete a category
        /// </summary>
        /// <param name="id">Id of category</param>
        /// <returns>A category within status 200 or 404 status</returns>
        /// <response code="204">Returns 204 status if delete successfully</response>
        /// <response code="404">Returns if the category is not exist</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _categoryService.Delete(id);
            return NoContent();
        }
    }
}
