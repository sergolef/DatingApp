using System;
using System.Text.Json;
using API.Helpers;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse res, int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            var h = new PaginationHeader(currentPage, itemPerPage, totalItems, totalPages);
            res.Headers.Add("X-Pagination", JsonSerializer.Serialize(h));
            res.Headers.Add("Access-Control-Expose-Headers", "X-Pagination");
        }
    }
}

