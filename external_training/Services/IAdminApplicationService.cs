using external_training.Controllers.DtoModels;

namespace external_training.Services
{
    public interface IAdminApplicationService
    {
        Task AddCourse(SelectedCourseRequest courseRequest);
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync();
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplicationsAsync();
    }
}