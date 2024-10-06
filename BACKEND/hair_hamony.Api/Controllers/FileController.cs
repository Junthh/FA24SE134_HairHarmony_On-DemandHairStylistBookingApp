//using hair_hamony.Business.Services.File;
//using hair_hamony.Business.ViewModels;
//using hair_hamony.Business.ViewModels.Files;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;

//namespace hair_hamony.API.Controllers
//{
//    public class FileController : BaseApiController
//    {
//        private readonly IFileService _fileService;
//        public FileController(IFileService fileService)
//        {
//            _fileService = fileService;
//        }

//        /// <summary>
//        /// Endpoint for upload file
//        /// </summary>
//        /// <returns>Url of file</returns>
//        /// <response code="200">Returns a url of file</response>
//        [HttpPost()]
//        [AllowAnonymous]
//        [ProducesResponseType(typeof(BaseResponse<FileModel>), StatusCodes.Status200OK)]
//        [Produces("application/json")]
//        public async Task<IActionResult> Create(IFormFile file)
//        {
//            return Ok(new BaseResponse<FileModel>(
//                msg: "Tải lên ảnh thành công",
//                data: await _fileService.UploadFile(file)
//            ));
//        }

//        /// <summary>
//        /// Endpoint for upload multiple file
//        /// </summary>
//        /// <returns>List url of list file</returns>
//        /// <response code="200">Returns list url of list file</response>
//        [HttpPost("multiple")]
//        [AllowAnonymous]
//        [ProducesResponseType(typeof(BaseResponse<IList<FileModel>>), StatusCodes.Status200OK)]
//        [Produces("application/json")]
//        public async Task<IActionResult> CreateMultiple(IList<IFormFile> files)
//        {
//            return Ok(new BaseResponse<IList<FileModel>>(
//                msg: "Tải lên nhiều ảnh thành công",
//                data: await _fileService.UploadFiles(files)
//            ));
//        }
//    }
//}
