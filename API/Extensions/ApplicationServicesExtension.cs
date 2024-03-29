﻿using System;
using API.Data;
using API.Helpers;
using API.Intrefaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString("DefaultConnection");

            services.Configure<CloudinaryConfig>(config.GetSection("CloudinarySettings"));

            var serverVersion = new MySqlServerVersion(new Version(8, 0, 30));

            //add repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ILikeRepository, LikeRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();

            services.AddDbContext<DataContext>(options =>
            {
                options.UseMySql(connectionString, serverVersion);
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            //add services
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LogUserAcivity>();


            //add mapers
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            return services;
        }
    }
}

