using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Intrefaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IUserRepository userRepository;
        private readonly IMapper _mapper;

        public AccountController(DataContext _context, ITokenService tokenService, IUserRepository userRepository, IMapper mapper) : base(_context)
        {
            _tokenService = tokenService;
            this.userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username))
            {
                return BadRequest("User name is exists");
            }

            using var hmac = new HMACSHA512();

            var user = _mapper.Map<AppUser>(registerDTO);


            user.UserName = registerDTO.Username.ToLower();
            user.UserPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
            user.UserSalt = hmac.Key;
            
            _cotext.Users.Add(user);
            await _cotext.SaveChangesAsync();

            return new UserDTO{
                Username = registerDTO.Username,
                Token =_tokenService.CreateToken(user),
                KnownAs = registerDTO.KnownAs,
            };
        }

        private async Task<bool> UserExists(string username){
            return await this._cotext.Users.AnyAsync(u => u.UserName == username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {

            var user = await userRepository.GetUserByNameAsync(loginDTO.Username);

            if (user == null)
            {
                return Unauthorized("User not found");
            }

            using var hmac = new HMACSHA512(user.UserSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for(int i=0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.UserPassword[i]) return Unauthorized();
            }
            
            return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                Photourl = user.Photos.FirstOrDefault(p => p.IsMain)?.Url
            };
        }
    }
}

