using System;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using API.Models;
using API.Middlewares;

namespace API.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionMiddlewareExtensions(this IApplicationBuilder builder, ILogger logger, IHostEnvironment env)
        {
            return builder.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
