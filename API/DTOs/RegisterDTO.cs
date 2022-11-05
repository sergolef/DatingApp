using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required, MinLength(3)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}