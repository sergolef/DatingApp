﻿using System;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] UserPassword { get; set; }
        public byte[] UserSalt { get; set; }

        public DateTime RegisteredAt { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string KnownAs { get; set; }
        public DateTime DateOfBirth { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public string Gender { get; set; }
        public string Interests { get; set; }
        public string LookingFor { get; set; }
        public string Introduction { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        //public int GetAge()
        //{
        //    return DateOfBirth.CalculateAge();
        //}

        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }

    }
}

