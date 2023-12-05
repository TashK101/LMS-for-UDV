using Duende.IdentityServer.Events;
using Duende.IdentityServer.Services;
using external_training.Models;
using Microsoft.AspNetCore.Identity;

public class UserRegistrationEventHandler : IEventSink
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserRegistrationEventHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
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
            }
        }
    }
}