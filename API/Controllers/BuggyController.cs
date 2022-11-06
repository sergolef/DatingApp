using System;
using System.Text.Json;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        public ActionResult<string> thingthToreturn { get; private set; }

        public BuggyController(DataContext _context) : base(_context)
        {
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
          
            
                var things = _cotext.Users.Find(-1);
                var thingthToreturn = things.ToString();
          
          
            return thingthToreturn;
        }


        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "text";
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
           
            return NotFound("Not found text");
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Thomething bad");
        }

      

    }
}

