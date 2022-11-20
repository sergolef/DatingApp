using System;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Intrefaces
{
    public interface ILikeRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);

        Task<AppUser> GetUserWithLikes(int userId);

        Task<PagedList<LikeDTO>> GetUserLikes(LikeParams likeParams);
    }
}

