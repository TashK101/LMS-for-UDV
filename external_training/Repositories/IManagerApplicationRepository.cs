using external_training.Models;

namespace external_training.Repositories
{
    public interface IManagerApplicationRepository
    {
        Task<IEnumerable<TrainingApplication>> GetPendingApplicationsAsync(string managerId);
    }
}