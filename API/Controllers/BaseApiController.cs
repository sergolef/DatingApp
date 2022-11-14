using System;
using API.Data;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserAcivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected DataContext _cotext;
        public BaseApiController(DataContext _context = null)
        {
            this._cotext = _context;
        }
    }
}

