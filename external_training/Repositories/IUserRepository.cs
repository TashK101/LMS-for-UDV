using external_training.Models;

namespace external_training.Repositories
{
    public interface IUserRepository
    {
        Task<ApplicationUser?> GetAsync(string userId);
    }
}