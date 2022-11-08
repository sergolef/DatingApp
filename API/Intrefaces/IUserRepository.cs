using System;
using API.DTOs;
using API.Entities;

namespace API.Intrefaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserById(int id);

        Task<IEnumerable<MemberDTO>> GetMembersAsync();

        Task<MemberDTO> GetMemberAsync(string name);
        Task<AppUser> GetUserByNameAsync(string username);

  
    }
}

