using System;
using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected DataContext _cotext;
        public BaseApiController(DataContext _context)
        {
            this._cotext = _context;
        }
    }
}

