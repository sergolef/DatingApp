using System;
namespace API.Helpers
{
    public class LikeParams : PagedParams
    {
        public int UserId { get; set; }
        public string Predicate { get; set; }
    }
}

