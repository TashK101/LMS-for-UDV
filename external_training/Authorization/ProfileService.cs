using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using external_training.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;

public class ProfileService : IProfileService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;

    public ProfileService(UserManager<ApplicationUser> userManager, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory)
    {
        _userManager = userManager;
        _claimsFactory = claimsFactory;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await _userManager.FindByIdAsync(sub);
        var principal = await _claimsFactory.CreateAsync(user!);

        var claims = principal.Claims.ToList();
        claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

        // Add custom claims
        claims.Add(new Claim(ClaimTypes.Name, user!.Id));

        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        context.IssuedClaims = claims;
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await _userManager.FindByIdAsync(sub);
        context.IsActive = user != null;
    }
}
