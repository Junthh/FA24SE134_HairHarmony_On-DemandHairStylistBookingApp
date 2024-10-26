using hair_hamony.Business.ViewModels.Files;
using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.Services.File
{
    public interface IFileService
    {
        Task<FileModel> UploadFile(IFormFile file);
        IList<FileModel> UploadFiles(IList<IFormFile> files);
    }
}
