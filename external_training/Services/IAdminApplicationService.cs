using external_training.Controllers.DtoModels;

namespace external_training.Services
{
    public interface IAdminApplicationService
    {
        Task EditCourse(CourseDto courseDto);
        Task<bool> ChangeStatusAsync(int applicationId, string status);
        Task CreateCommentAsync(CommentCreation commentCreation, string userId);
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync();
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplicationsAsync();
    }
}