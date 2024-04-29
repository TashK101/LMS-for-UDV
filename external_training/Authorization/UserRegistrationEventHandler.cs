using Duende.IdentityServer.Events;
using Duende.IdentityServer.Services;
using external_training.Data;
using external_training.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class UserRegistrationEventHandler : IEventSink
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public UserRegistrationEventHandler(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task PersistAsync(Event evt)
    {
        if (evt is UserLoginSuccessEvent userLoginSuccessEvent)
        {
            var user = await _userManager.FindByNameAsync(userLoginSuccessEvent.Username);
            if (user != null)
            {
                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Contains("User"))
                {
                    await _userManager.AddToRoleAsync(user, "User");
                }
                await EnsureDefaultDepartmentAndTeamAsync(user);
            }
        }
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