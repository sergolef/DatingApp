using System;
namespace API.Models
{
    public class ErrorDetails
    {
        public ErrorDetails()
        {
        }

        public ErrorDetails(string status, string message, string details)
        {
            StatusCode = status;
            Message = message;
            Details = details;
        }

        public string StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}

