using external_training.Models;

namespace external_training.Repositories
{
    public interface IUserApplicationRepository
    {
        Task<int> AddAsync(TrainingApplication trainingApplication);
        Task AddCommentAsync(Comment comment);
        Task<TrainingApplication?> GetAsync(int applicationId);
        Task<Course?> GetCourseAsync(int applicationId);
        Task<IEnumerable<TrainingApplication>> GetApplicationsAsync(string userId);
        Task<IEnumerable<TrainingApplication>> GetArchivedApplicationsAsync(string userId);
        Task<IEnumerable<Comment>> GetComments(int applicationId);
        Task<IEnumerable<Course>> GetActiveCoursesAsync();
        Task<TrainingApplication?> GetBySoloDocumentIdAsync(Guid soloDocumentId);
    }
}