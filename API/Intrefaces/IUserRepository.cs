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

        Task<AppUser> GetUserByName(string name);

        Task<IEnumerable<MemberDTO>> GetMembersAsync();

        Task<MemberDTO> GetMemberAsync(string name);
    }
}

