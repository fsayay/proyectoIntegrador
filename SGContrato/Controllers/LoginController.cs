using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace SGContrato.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        [Route("login")]
        public async Task Login(string returnUrl)
        {

            returnUrl = "https://127.0.0.1:5001/contratos";
            var props = new AuthenticationProperties { RedirectUri = returnUrl };
            await HttpContext.ChallengeAsync("CAS", props);


        }

        [HttpGet("getUser")]
        public IActionResult GetUser()
        {
            Dictionary<string, object> info = new Dictionary<string, object>();

            if (this.User.Identity.IsAuthenticated)
            {
                foreach (var claim in this.User.Claims.TakeWhile(c => this.User.Claims.Count(x => c.Type == x.Type) == 1))
                {
                    int index = claim.Type.Contains('/') ? claim.Type.LastIndexOf('/') + 1 : 0;
                    info.Add(claim.Type.Substring(index), claim.Value);
                }
                List<string> roles = this.User.Claims.Where(c => c.Type.Contains("role")).Select(x => x.Value).ToList();
                info.Add("roles", roles);
                info.Add("ultimoAcceso", DateTime.Now);
                return Ok(info);
            }
            return NotFound();
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();

            // Do a full CAS logout.  
            // This removes the user's CAS auth cookie from the CAS domain.
            return Redirect($"{_configuration["CasBaseUrl"]}/logout");
        }
    }
    
}