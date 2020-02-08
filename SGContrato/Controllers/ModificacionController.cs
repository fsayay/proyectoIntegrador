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
    public class ModificacionController : ControllerBase
    {
        private readonly MyDBContext _context;

        public ModificacionController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/Modificacion
        [HttpGet]
        public IEnumerable<Modificacion> GetModificacion()
        {
            return _context.SG_Modificaciones;
        }

        // GET: api/Modificacion/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetModificacion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contrato contrato;

            contrato = await _context.SG_Contratos.Include(m => m.modificaciones).SingleOrDefaultAsync(c => c.ID == id);

            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }

        private async Task CrearOEditarModificacion(ICollection<Modificacion> modificaciones)
        {
            List<Modificacion> nuevaModificacion = modificaciones.Where(x => x.ID == 0).ToList();
            List<Modificacion> modificarModificacion = modificaciones.Where(x => x.ID != 0).ToList();
            if (nuevaModificacion.Any())
            {
                await _context.AddRangeAsync(nuevaModificacion);
            }
            if (modificarModificacion.Any())
            {
                _context.UpdateRange(modificarModificacion);
            }
        }

        // PUT: api/Modificacion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModificacion([FromRoute] int id, [FromBody] Contrato contrato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contrato.ID)
            {
                return BadRequest();
            }

            _context.Entry(contrato).State = EntityState.Modified;

            try
            {
                await CrearOEditarModificacion(contrato.modificaciones);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContratoExists(id))
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

        // POST: api/Modificacion
        [HttpPost]
        public async Task<IActionResult> PostModificacion([FromBody] Modificacion modificacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SG_Modificaciones.Add(modificacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntregable", new { id = modificacion.ID }, modificacion);
        }

        // DELETE: api/Modificacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModificacion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var modificacion = await _context.SG_Modificaciones.FindAsync(id);
            if (modificacion == null)
            {
                return NotFound();
            }

            _context.SG_Modificaciones.Remove(modificacion);
            await _context.SaveChangesAsync();

            return Ok(modificacion);
        }

        private bool ContratoExists(int id)
        {
            return _context.SG_Contratos.Any(e => e.ID == id);
        }
    }
}
