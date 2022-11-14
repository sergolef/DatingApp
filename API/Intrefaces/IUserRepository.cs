using System;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Intrefaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<bool> SaveAllAsync();

        Task<AppUser> GetUsersAsync();

        Task<AppUser> GetUserById(int id);

        Task<PagedList<MemberDTO>> GetMembersAsync(PagedParams pageParams);

        Task<MemberDTO> GetMemberAsync(string name);
        Task<AppUser> GetUserByNameAsync(string username);

        Task<AppUser> GetUserByIdAsync(int id);

  
    }
}

