using System;
namespace API.Helpers
{
    public class MessageParams : PagedParams
    {
        public string Username { get; set; }
        public string Container { get; set; } = "Unread";
    }
}

