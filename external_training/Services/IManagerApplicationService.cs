using external_training.Controllers.DtoModels;

namespace external_training.Services
{
    public interface IManagerApplicationService
    {
        Task<bool> AcceptApplicationAsync(int applicationId);
        Task CreateCommentAsync(CommentCreation commentCreation, string userId);
        Task<bool> DeclineApplicationAsync(int applicationId);
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync(string managerId);
        Task<IEnumerable<CommentDto>> GetComments(int applicationId);
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplicationsAsync(string managerId);
    }
}