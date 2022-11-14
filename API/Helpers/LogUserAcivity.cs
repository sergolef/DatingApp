using System;
using API.Extensions;
using API.Intrefaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LogUserAcivity : IAsyncActionFilter
    {
   

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {

            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = resultContext.HttpContext.User.GetUserId();

            //get service
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();

            var user = await repo.GetUserByIdAsync(userId);

            //update lastactive time for user
            user.LastActive = DateTime.Now;

            repo.Update(user);

            await repo.SaveAllAsync();
        }
    }
}

