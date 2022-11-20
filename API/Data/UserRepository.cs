using System;
using System.Security.Claims;
using System.Xml.Linq;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Intrefaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository:IUserRepository
    {
        private readonly DataContext context;
        private IMapper mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<MemberDTO> GetMemberAsync(string name)
        {
            return await context.Users
                .Where(x => x.UserName == name)
                .ProjectTo<MemberDTO>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams pagedParams)
        {
            

            var query = context.Users.AsQueryable();
            query = query.Where(p => p.UserName != pagedParams.Username);
            query = query.Where(p => p.Gender == pagedParams.Gender);

            var minAge = DateTime.Today.AddYears(-pagedParams.MinAge - 1);
            var maxAge = DateTime.Today.AddYears(-pagedParams.MaxAge);
            query = query.Where(p => p.DateOfBirth <= minAge && p.DateOfBirth >= maxAge);

            query = pagedParams.OrderBy switch
            {
                "created" => query.OrderByDescending(p => p.RegisteredAt),
                "city" => query.OrderByDescending(p => p.City),
                "country" => query.OrderByDescending(p => p.Country),
                
                "lastactive" => query.OrderByDescending(p => p.LastActive),
                _ => query.OrderByDescending(p => p.LastActive),
                        
            };
            
            return await PagedList<MemberDTO>.ToPagedListAsync(
                query.ProjectTo<MemberDTO>(mapper.ConfigurationProvider).AsNoTracking(),
                pagedParams.PageNumber,
                pagedParams.PageSize
            );
        }

        public async Task<AppUser> GetUserById(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<AppUser> GetUserByNameAsync(string name)
        {
            return await context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == name);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync(PagedParams pageParams)
        {
            return await context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public Task<AppUser> GetUsersAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            context.Entry(user).State = EntityState.Modified;
        }
    }
}

