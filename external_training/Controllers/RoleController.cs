using Duende.IdentityServer.Events;
using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace external_training.Controllers
{
    [Route("serviceApi/role")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly ILogger<RoleController> _loggre;
        private readonly UserManager<ApplicationUser> _userManager;

        public RoleController(UserManager<ApplicationUser> userManager, ILogger<RoleController> logger)
        {
            _userManager = userManager;
            _loggre = logger;
        }

        [HttpGet("now")]
        public async Task<ActionResult<IList<string>>> GetNow()
        {
            var id = User.Identity.Name;
            var user = await _userManager.FindByIdAsync(id);
            var roles = await _userManager.GetRolesAsync(user!);
            return Ok(roles);
        }

        [HttpPost("AddToRoleUser")]
        public async Task<ActionResult<IList<string>>> AddToRoleUser()
        {
            var id = User.Identity.Name;
            var user = await _userManager.FindByIdAsync(id);
            await _userManager.AddToRoleAsync(user, "User");
            var roles = await _userManager.GetRolesAsync(user!);
            return Ok(roles);
        }

        [HttpPost("AddToRoleAdmin")]
        public async Task<ActionResult<IList<string>>> AddToRoleAdmin()
        {
            var id = User.Identity.Name;
            var user = await _userManager.FindByIdAsync(id);
            await _userManager.AddToRoleAsync(user, "Admin");
            var roles = await _userManager.GetRolesAsync(user!);
            return Ok(roles);
        }

        [HttpPost("AddToRoleManager")]
        public async Task<ActionResult<IList<string>>> AddToRoleManager()
        {
            var id = User.Identity.Name;
            var user = await _userManager.FindByIdAsync(id);
            await _userManager.AddToRoleAsync(user, "Manager");
            var roles = await _userManager.GetRolesAsync(user!);
            return Ok(roles);
        }
    }
}
