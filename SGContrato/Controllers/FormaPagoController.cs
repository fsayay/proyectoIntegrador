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
    public class FormaPagoController : ControllerBase
    {
        private readonly MyDBContext _context;

        public FormaPagoController(MyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<FormaPago> GetFormaPago()
        {
            return _context.SG_FormaPago;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFormaPago([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FormaPago formaPago;

            formaPago = await _context.SG_FormaPago.Include(m => m.pagos).SingleOrDefaultAsync(fp => fp.contratoID == id);

            if (formaPago == null)
            {
                return NotFound();
            }

            return Ok(formaPago);
        }

        // PUT: api/FormaPago/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormaPago([FromRoute] int id, [FromBody] FormaPago formaPago)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != formaPago.ID)
            {
                return BadRequest();
            }

            _context.Entry(formaPago).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormaPagoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FormaPago
        [HttpPost]
        public async Task<IActionResult> PostFormaPago([FromBody] FormaPago formaPago)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SG_FormaPago.Add(formaPago);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFormaPago", new { id = formaPago.ID }, formaPago);
        }

        // DELETE: api/FormaPago/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormaPago([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var formaPago = await _context.SG_FormaPago.FindAsync(id);
            if (formaPago == null)
            {
                return NotFound();
            }

            _context.SG_FormaPago.Remove(formaPago);
            await _context.SaveChangesAsync();

            return Ok(formaPago);
        }

        private bool FormaPagoExists(int id)
        {
            return _context.SG_FormaPago.Any(e => e.ID == id);
        }
    }
}
