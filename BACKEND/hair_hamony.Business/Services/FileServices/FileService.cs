using Firebase.Storage;
using hair_hamony.Business.ViewModels.Files;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace hair_hamony.Business.Services.File
{
    public class FileService : IFileService
    {
        private readonly IConfiguration _configuration;
        public FileService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<FileModel> UploadFile(IFormFile file)
        {
            var bucket = _configuration["FireBase:bucket"];

            string fileName = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
            var stream = file.OpenReadStream();

            var task = new FirebaseStorage(bucket)
                .Child("files")
                .Child(fileName)
                .PutAsync(stream);

            string urlImage = await task;

            return new FileModel() { Url = urlImage };
        }

        public IList<FileModel> UploadFiles(IList<IFormFile> files)
        {
            var bucket = _configuration["FireBase:bucket"];
            List<Task<FileModel>> tasks = [];
            foreach (var file in files)
            {
                tasks.Add(Task.Run(async () =>
                {
                    string fileName = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
                    var stream = file.OpenReadStream();

                    var task = new FirebaseStorage(bucket)
                        .Child("files")
                        .Child(fileName)
                        .PutAsync(stream);

                    string urlImage = await task;

                    return new FileModel() { Url = urlImage };
                }));
            }

            var continuation = Task.WhenAll(tasks);
            continuation.Wait();

            return continuation.Result;
        }
    }
}
