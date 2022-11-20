using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Intrefaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace API.Data
{
    public class LikeRepository : ILikeRepository
    {
        private readonly DataContext _context;

        public LikeRepository(DataContext context)
        {
            this._context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await this._context.Likes.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<PagedList<LikeDTO>> GetUserLikes(LikeParams pagedParams)
        {
            var users = this._context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = this._context.Likes.AsQueryable();

            if (pagedParams.Predicate == "liked")
            {
                likes = likes.Where(p => p.SourceUserId == pagedParams.UserId);
                users = likes.Select(l => l.LikedUser);
            }

            if (pagedParams.Predicate == "likedBy")
            {
                likes = likes.Where(p => p.LikedUserId == pagedParams.UserId);
                users = likes.Select(l => l.SourceUser);
            }

            return await PagedList<LikeDTO>.ToPagedListAsync(
                users.Select(user => new LikeDTO
                {
                    Username = user.UserName,
                    KnownAs = user.KnownAs,
                    Age = user.DateOfBirth.CalculateAge(),
                    Id = user.Id,
                    City = user.City,
                    PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url
                }).AsNoTracking(),
                pagedParams.PageNumber,
                pagedParams.PageSize
            );
        }


        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await this._context.Users
                .Include(l => l.LikedUsers)
                .FirstOrDefaultAsync(k => k.Id == userId);
        }


    }
}

