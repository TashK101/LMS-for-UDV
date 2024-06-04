using external_training.Models;

namespace external_training.Repositories
{
    public interface IAdminApplicationRepository
    {
        Task EditCourse(Course course);
        Task ReplaceManagersAsync(int applicationId, IEnumerable<ApprovingManager> newManagers);
        Task<bool> ChangeStatusAsync(int applicationId, ApplicationStatus status);
        Task<IEnumerable<TrainingApplication>> GetArchivedApplicationsAsync();
        Task<IEnumerable<TrainingApplication>> GetPendingApplicationsAsync();
        Task<bool> UpdateSoloDocumentIdAsync(int applicationId, Guid soloDocumentId);
    }
}