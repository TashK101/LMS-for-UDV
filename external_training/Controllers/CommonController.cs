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

        [HttpPost("delete_aplication")]
        public async Task<ActionResult<int>> DeleteAplication(int aplicationId)
        {
            var count = await _context.TrainingApplications
                .Where(a => a.TrainingApplicationId == aplicationId)
                .ExecuteDeleteAsync();
            return Ok(count);
        }
    }
}
