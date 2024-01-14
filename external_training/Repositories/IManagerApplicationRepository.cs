using external_training.Models;

namespace external_training.Repositories
{
    public interface IManagerApplicationRepository
    {
        Task<bool> AcceptApplicationAsync(int applicationId);
        Task<bool> DeclineApplicationAsync(int applicationId);
        Task<IEnumerable<TrainingApplication>> GetArchivedApplicationsAsync(string managerId);
        Task<IEnumerable<TrainingApplication>> GetPendingApplicationsAsync(string managerId);
    }
}