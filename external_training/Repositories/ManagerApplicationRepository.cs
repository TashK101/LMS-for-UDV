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
                .Where(a => a.ManagerId == managerId && a.Status == ApplicationStatus.AwaitingManagerApproval)
                .ToListAsync();
        }

        public async Task<IEnumerable<TrainingApplication>> GetArchivedApplicationsAsync(string managerId)
        {
            return await _context.TrainingApplications
                .Include(a => a.Comments)
                .Where(a => a.ManagerId == managerId && a.Status != ApplicationStatus.AwaitingManagerApproval)
                .ToListAsync();
        }

        public async Task<bool> DeclineApplicationAsync(int applicationId)
        {
            var updateCount = await _context.TrainingApplications
                .Where(a => a.TrainingApplicationId == applicationId)
                .ExecuteUpdateAsync(
                    s => s.SetProperty(a => a.Status, a => ApplicationStatus.NotApproved));
            if (updateCount > 0)
                return true;
            return false;
        }

        public async Task<bool> AcceptApplicationAsync(int applicationId)
        {
            var updateCount = await _context.TrainingApplications
                .Where(a => a.TrainingApplicationId == applicationId)
                .ExecuteUpdateAsync(
                    s => s.SetProperty(a => a.Status, a => ApplicationStatus.CourseSelection));
            if (updateCount > 0)
                return true;
            return false;
        }
    }
}