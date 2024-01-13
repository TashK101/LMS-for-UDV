using Duende.IdentityServer.Events;
using external_training.Controllers.DtoModels;
using external_training.Data;
using external_training.Models;
using external_training.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace external_training.Controllers
{
    [Route("serviceApi/common")]
    [ApiController]
    [Authorize]
    public class CommonController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RoleController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        public CommonController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, ILogger<RoleController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost("add_full_name")]
        public async Task<ActionResult<string>> AddFullName(string name)
        {
            var id = User.Identity.Name;
            var user =await _userManager.FindByIdAsync(id);
            user.FullName = name;
            await _userManager.UpdateAsync(user);
            var updateUser = await _userManager.FindByIdAsync(id);
            return Ok(updateUser.FullName);
        }

        [HttpPost("add_user_to_default_team")]
        public async Task<ActionResult<int>> AddUserToDefaultTeam()
        {
            var id = User.Identity.Name;
            var user = await _userManager.FindByIdAsync(id);
            await EnsureDefaultDepartmentAndTeamAsync(user);
            var updateUser = await _userManager.FindByIdAsync(id);
            return Ok(updateUser.TeamId);
        }

        private async Task EnsureDefaultDepartmentAndTeamAsync(ApplicationUser user)
        {
            var defaultDepartment = await _context.Departments.FirstOrDefaultAsync(d => d.Name == "Default");
            if (defaultDepartment == null)
            {
                defaultDepartment = new Department { Name = "Default" };
                _context.Departments.Add(defaultDepartment);
                await _context.SaveChangesAsync();
            }

            var defaultTeam = await _context.Teams.FirstOrDefaultAsync(t => t.Name == "Default");
            if (defaultTeam == null)
            {
                defaultTeam = new Team { Name = "Default", DepartmentId = defaultDepartment.DepartmentId };
                _context.Teams.Add(defaultTeam);
                await _context.SaveChangesAsync();
            }

            if (user.TeamId == null)
            {
                user.TeamId = defaultTeam.TeamId;
                _context.Update(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
