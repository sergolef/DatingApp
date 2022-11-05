using System;
using API.Entities;

namespace API.Intrefaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}

