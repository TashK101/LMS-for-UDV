using external_training.Controllers.DtoModels;

namespace external_training.Services
{
    public interface IManagerApplicationService
    {
        Task<bool> AcceptApplicationAsync(int applicationId);
        Task<bool> DeclineApplicationAsync(int applicationId);
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync(string managerId);
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplicationsAsync(string managerId);
    }
}