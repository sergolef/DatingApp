using System;
using CloudinaryDotNet.Actions;

namespace API.Intrefaces
{
    public interface IPhotoService
    {
        public Task<ImageUploadResult> UploadImageAsync(IFormFile file);

        public Task<DeletionResult> DeleteFotoAsync(string publicId);
    }
}

