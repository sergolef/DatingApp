using System;
namespace API.Helpers
{
    public class UserParams : PagedParams
    {
        public string Username { set; get; }
        public string Gender { set; get; }
        public int MaxAge { get; set; } = 60;
        public int MinAge { set; get; } = 18;
        public string OrderBy { set; get; } = "created";
    }
}

