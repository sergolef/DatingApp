using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Intrefaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
   
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository userRepository;
        

        public IMapper Mapper { get; }
        public IPhotoService photoService { get; }

        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService pService)
        {
            this.userRepository = userRepository;
            Mapper = mapper;
            photoService = pService;
        }

        // GET: /<controller>/
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers([FromQuery]PagedParams pagedParams)
        {
            var username = User.GetUsername();

            var user = await this.userRepository.GetUserByNameAsync(username);
            var defGender = user.Gender == "male" ? "female" : "male";


            pagedParams.Gender = (pagedParams.Gender != null) ? pagedParams.Gender : defGender;
            pagedParams.Username = username;

            var users = await this.userRepository.GetMembersAsync(pagedParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);


            return Ok(users);
        }

        [HttpGet("{username}", Name = "GetUser")]
        [Authorize]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        { 
            return await this.userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdate)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await userRepository.GetUserByNameAsync(username);
            Mapper.Map(memberUpdate, user);

            userRepository.Update(user);
            if( await userRepository.SaveAllAsync())
            {
               return NoContent();
            }
            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDTO>> UploadPhoto(IFormFile file)
        {
            var username = User.GetUsername();

            var user = await this.userRepository.GetUserByNameAsync(username);

            var result = await this.photoService.UploadImageAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo()
            {
                Url = result.SecureUrl.AbsoluteUri,
                PablicId = result.PublicId
            };

            if(user.Photos.Count == 0) {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if (await this.userRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, Mapper.Map<PhotoDTO>(photo));
            }

            return BadRequest("Failed to upload user image");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await userRepository.GetUserByNameAsync(username);

            var currentMainPhoto = user.Photos.FirstOrDefault(p => p.IsMain == true);

            if (photoId == currentMainPhoto.Id) return BadRequest("This photo was main yet");
            currentMainPhoto.IsMain = false;
            var newMain = user.Photos.FirstOrDefault(p => p.Id == photoId) ;
            newMain.IsMain = true;
            this.userRepository.Update(user);
           
            if (await userRepository.SaveAllAsync())
            {
                return NoContent();
            }
            return BadRequest("Failed to update user");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeleteImage(int photoId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await userRepository.GetUserByNameAsync(username);

            var currentPhoto = user.Photos.FirstOrDefault(p => p.Id == photoId);
            if (currentPhoto == null){
                return BadRequest("Photo is not found");
            }

            if (currentPhoto?.IsMain == true)
            {
                return BadRequest("There are no ability to delete main photo");
            }



            var delResult = await this.photoService.DeleteFotoAsync(currentPhoto.PablicId);
            if(delResult.Error != null)
            {
                return BadRequest(delResult.Error.Message);
            }

            
            
            user.Photos.Remove(currentPhoto);
            if (await this.userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete user photo");

        }
    }
}

