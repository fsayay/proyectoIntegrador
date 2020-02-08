using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SGContrato.Models;

namespace SGContrato.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class contratoViewsController : ControllerBase
    {
        private readonly MyDBContext _context;

        public contratoViewsController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/ContratoViews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contrato_View>>> GetcontratoViews()
        {
            return await _context.contrato_Views.ToListAsync();
        }

    }
    
}