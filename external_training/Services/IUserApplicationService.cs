using external_training.Controllers.DtoModels;
 
namespace external_training.Services
{
    public interface IUserApplicationService
    {
        Task CreateCommentAsync(CommentCreation commentCreation, string userId);
        Task CreateTrainingApplicationAsync(TrainingApplicationRequest request, string userId);
        Task<IEnumerable<ManagerInfo>> GetManagersAsync();
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync(string userId);
        Task<DetaileTrainingApplicationResponse?> GetTrainingApplicationAsync(int applicationId);
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetTrainingApplicationsAsync(string userId);
    }
}