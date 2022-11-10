using System;
using API.Helpers;
using API.Intrefaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private Cloudinary _cloudinary { get; set; }

        public PhotoService(IOptions<CloudinaryConfig> config)
        {


            Account account = new Account(
              config.Value.CloudName,
              config.Value.ApiKey,
              config.Value.ApiSecret
            );

            this._cloudinary = new Cloudinary(account);
        }

        public async Task<DeletionResult> DeleteFotoAsync(string publicId)
        {
            var deletionParams = new DeletionParams(publicId);
           
            var deletionResult = await this._cloudinary.DestroyAsync(deletionParams);

            return deletionResult;
        }

        public async Task<ImageUploadResult> UploadImageAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                uploadResult = await this._cloudinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

      
    }
}

