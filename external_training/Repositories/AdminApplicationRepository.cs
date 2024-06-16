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

        public async Task EditCourse(Course course)
        {
            if (course.CourseId == 0)
                _context.Courses.Add(course);
            else
            {
                var trackedCourse = _context.Courses.Local.FirstOrDefault(c => c.CourseId == course.CourseId);
                if (trackedCourse != null)
                {
                    _context.Entry(trackedCourse).CurrentValues.SetValues(course);
                }
                else
                {
                    _context.Courses.Attach(course);
                    _context.Entry(course).State = EntityState.Modified;
                }
            }
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