using external_training.Data;
using external_training.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace external_training.Repositories
{
    public class UserApplicationRepository : IUserApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public UserApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddAsync(TrainingApplication trainingApplication)
        {
            await _context.TrainingApplications.AddAsync(trainingApplication);
            await _context.SaveChangesAsync();
            return trainingApplication.TrainingApplicationId;
        }

        public async Task AddCommentAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Comment>> GetComments(int applicationId)
        {
            return await _context.Comments
                .Include(c => c.User)
                .Where(c => c.TrainingApplicationId == applicationId)
                .ToListAsync();
        }

        public async Task<TrainingApplication?> GetAsync(int applicationId)
        {
            return await _context.TrainingApplications
                .Include(a => a.Manager)
                .Include(a => a.User)
                .Include(a => a.Department)
                .Include(a => a.Team)
                .Include(a => a.Comments)
                .Include(a => a.SelectedCourse)
                .FirstOrDefaultAsync(a => a.TrainingApplicationId == applicationId);
        }

        public async Task<SelectedTrainingCourse?> GetSelectedCourseAsync(int applicationId)
        {
            return await _context.SelectedTrainingCourses
                .FirstOrDefaultAsync(c => c.TrainingApplicationId == applicationId);
        }

        public async Task<IEnumerable<TrainingApplication>> GetApplicationsAsync(string userId)
        {
            return await _context.TrainingApplications
                .Include(a => a.Comments)
                .Where(a => a.UserId == userId && a.IsArchived == false)
                .ToListAsync();
        }

        public async Task<IEnumerable<TrainingApplication>> GetArchivedApplicationsAsync(string userId)
        {
            return await _context.TrainingApplications
                .Include(a => a.Comments)
                .Where(a => a.UserId == userId && a.IsArchived)
                .ToListAsync();
        }

        public async Task<IEnumerable<SelectedTrainingCourse>> GetActiveCoursesAsync()
        {
            return await _context.SelectedTrainingCourses
                .Include(c => c.TrainingApplication)
                .Where(c => c.TrainingApplication.IsArchived == false)
                .ToListAsync();
        }
    }
}
