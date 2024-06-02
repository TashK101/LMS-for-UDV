using external_training.Data;
using external_training.Models;
using Microsoft.EntityFrameworkCore;

namespace external_training.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<ApplicationUser?> GetAsync(string userId)
        {
            return _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
