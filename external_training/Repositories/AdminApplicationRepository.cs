using external_training.Data;
using external_training.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace external_training.Repositories
{
    public class AdminApplicationRepository : IAdminApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public AdminApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TrainingApplication>> GetPendingApplicationsAsync()
        {
            return await _context.TrainingApplications
                .Include(a => a.User)
                .Include(a => a.Comments)
                .Where(a => a.IsArchived == false)
                .ToListAsync();
        }

        public async Task<IEnumerable<TrainingApplication>> GetArchivedApplicationsAsync()
        {
            return await _context.TrainingApplications
                .Include(a => a.User)
                .Include(a => a.Comments)
                .Where(a => a.IsArchived)
                .ToListAsync();
        }

        public async Task ReplaceManagersAsync(int applicationId, IEnumerable<ApprovingManager> newManagers)
        {
            var application = await _context.TrainingApplications
                .Include(a => a.ApprovingManagers)
                .FirstOrDefaultAsync(a => a.TrainingApplicationId == applicationId);
            if (application == null)
                return;

            foreach (var oldManager in application.ApprovingManagers)
                _context.ApprovingManagers.Remove(oldManager);

            foreach (var newManager in newManagers)
            {
                newManager.TrainingApplicationId = applicationId;
                _context.ApprovingManagers.Add(newManager);
            }

            await _context.SaveChangesAsync();
        }

        public async Task EditCourse(Course course)
        {
            _context.Courses.Update(course);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateSoloDocumentIdAsync(int applicationId, Guid soloDocumentId)
        {
            var updateCount = await _context.TrainingApplications
                .Where(a => a.TrainingApplicationId == applicationId)
                .ExecuteUpdateAsync(
                    s => s.SetProperty(a => a.SoloDocumentId, a => soloDocumentId));
            if (updateCount > 0)
                return true;
            return false;
        }

        public async Task<bool> ChangeStatusAsync(int applicationId, ApplicationStatus status)
        {
            var updateCount = await _context.TrainingApplications
                .Where(a => a.TrainingApplicationId == applicationId)
                .ExecuteUpdateAsync(
                    s => s.SetProperty(a => a.Status, a => status));
            if (updateCount > 0)
                return true;
            return false;
        }
    }
}