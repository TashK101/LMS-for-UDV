using external_training.Data;
using external_training.Models;
using Microsoft.EntityFrameworkCore;

namespace external_training.Repositories
{
    public class ManagerApplicationRepository : IManagerApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public ManagerApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TrainingApplication>> GetPendingApplicationsAsync(string managerId)
        {
            return await _context.TrainingApplications
                .Include(a => a.Comments)
                .Where(a => a.ManagerId == managerId && a.IsArchived == false && a.Status == ApplicationStatus.AwaitingManagerApproval)
                .ToListAsync();
        }
    }
}