using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Entities;

namespace API.Data
{
    public static class Seeder
    {

        public static void Initialize(DataContext context)
        {
            context.Database.EnsureCreated();

            var seedFileData = System.IO.File.ReadAllText("Data/UserSeedData.json");

            var jsonData = JsonSerializer.Deserialize<List<AppUser>>(seedFileData);
            foreach(var user in jsonData)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.UserPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes("somesecret@kk"));
                user.UserSalt = hmac.Key;
                

                context.Users.Add(user);
            }

            context.SaveChanges();
        }
        
    }
}

