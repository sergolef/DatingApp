using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Intrefaces;
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

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            Mapper = mapper;
        }

        // GET: /<controller>/
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            var users = await this.userRepository.GetUsersAsync();

            var userToReturn = Mapper.Map<IEnumerable<MemberDTO>>(users);

            return Ok(await this.userRepository.GetMembersAsync());
        }

        [HttpGet("{username}")]
        [Authorize]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        { 
            return await this.userRepository.GetMemberAsync(username);
        }
    
    }
}

