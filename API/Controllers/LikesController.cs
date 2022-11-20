using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Intrefaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository userRepository;
        private readonly ILikeRepository likeRepository;

        public LikesController(IUserRepository userRepository, ILikeRepository likeRepository)
        {
            this.userRepository = userRepository;
            this.likeRepository = likeRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await userRepository.GetUserByNameAsync(username);

            var sourceUser = await likeRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return BadRequest("User not found");

            if (sourceUser.UserName == username) return BadRequest("You cant set like for yourself");

            var userLike = await likeRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike != null) return BadRequest("You already liked this user");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id
            };
            sourceUser.LikedUsers.Add(userLike);

            if (await userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Something went wrong");


        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDTO>>> GetUserLikes([FromQuery] LikeParams pagedParams)
        {
            
            pagedParams.UserId = User.GetUserId();
            var user = await likeRepository.GetUserLikes(pagedParams);

            Response.AddPaginationHeader(user.CurrentPage, user.PageSize, user.TotalCount, user.TotalPages);

            return Ok(user);
        }

    }
}

