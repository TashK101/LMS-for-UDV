using Duende.IdentityServer.Events;
using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Services;
using external_training.SoloIntegration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OrgStructure.Model;
using System.Security.Claims;

namespace external_training.Controllers
{
    [Route("api/role")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly ILogger<RoleController> _loggre;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly OrgStructureRepository _orgStructureRepository;

        public RoleController(UserManager<ApplicationUser> userManager, OrgStructureRepository orgStructureRepository, ILogger<RoleController> logger)
        {
            _userManager = userManager;
            _orgStructureRepository = orgStructureRepository;
            _loggre = logger;
        }

        [HttpGet("now")]
        public async Task<ActionResult<RoleResponse>> GetNow()
        {
            var id = User!.Identity!.Name!;
            var user = await _userManager.FindByIdAsync(id);
            var roles = await _userManager.GetRolesAsync(user!);
            if (roles.Count == 0)
            {
                await _userManager.AddToRoleAsync(user!, "User");
                roles = await _userManager.GetRolesAsync(user!);
            }
            if (user!.SoloPersonId == null)
            {
                var soloUser = _orgStructureRepository.GetPersonByEmail(user.Email!);
                if (soloUser != null)
                {
                    user.FullName = soloUser.GetFullName();
                    user.SoloPersonId = soloUser.Id;
                    await _userManager.UpdateAsync(user);
                }
                else
                    return NotFound();
            }
            var role = new RoleResponse
            {
                UserId = id,
                UserEmail = user.Email!,
                UserFullName = user.FullName,
                SoloPersonId = user.SoloPersonId,
                RoleName = roles.Order().First()
        };
            return Ok(role);
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
    }
}
