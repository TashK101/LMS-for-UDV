using external_training.Controllers.DtoModels;

namespace external_training.Services
{
    public interface IAdminApplicationService
    {
        Task EditCourse(CourseDto courseDto);
        Task ReplaceManagersAsync(ReplaceManagersDto replace);
        Task<bool> ChangeStatusAsync(int applicationId, string status);
        Task<bool> SendApplicationToSolo(int ApplicationId);
        Task CreateCommentAsync(CommentCreation commentCreation, string userId);
        Task<IEnumerable<SoloManagerDto>> GetManagersAsync(string userId);
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync();
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplicationsAsync();
        Task EditDesiredCourse(CourseDto courseDto);
        Task ReplaceParticipantsAsync(ReplaceParticipantsDto replace);
    }
}