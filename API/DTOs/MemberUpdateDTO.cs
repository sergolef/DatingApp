﻿using System;
using API.Entities;

namespace API.DTOs
{
    public class MemberUpdateDTO
    { 
        public string Interests { get; set; }
        public string LookingFor { get; set; }
        public string Introduction { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}

