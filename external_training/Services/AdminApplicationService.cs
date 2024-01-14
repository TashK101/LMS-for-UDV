using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;

namespace external_training.Services
{
    public class AdminApplicationService : IAdminApplicationService
    {
        private readonly IAdminApplicationRepository _adminApplicationRepository;

        public AdminApplicationService(IAdminApplicationRepository adminApplicationRepository)
        {
            _adminApplicationRepository = adminApplicationRepository;
        }

        public async Task AddCourse(SelectedCourseRequest courseRequest)
        {
            var status = (ApplicationStatus)Enum.Parse(typeof(ApplicationStatus), courseRequest.Status);
            await _adminApplicationRepository.ChangeStatusAsync(courseRequest.TrainingApplicationId, status);
            var course = Mapper.MapToSelectedTrainingCourse(courseRequest);
            await _adminApplicationRepository.AddCourse(course);
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplicationsAsync()
        {
            var applications = await _adminApplicationRepository.GetPendingApplicationsAsync();
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync()
        {
            var applications = await _adminApplicationRepository.GetArchivedApplicationsAsync();
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }
    }
}
