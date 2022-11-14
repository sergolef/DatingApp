using System;
namespace API.Helpers
{
    public class PagedParams
    {
        const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public string Username { set; get; }
        public string Gender { set; get; }
        public int MaxAge { get; set; } = 60;
        public int MinAge { set; get; } = 18;
        public string OrderBy { set; get; } = "created";
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}

