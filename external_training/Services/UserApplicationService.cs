using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;
using Microsoft.AspNetCore.Identity;

namespace external_training.Services
{
    public class UserApplicationService : IUserApplicationService
    {
        private readonly IUserApplicationRepository _applicationRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserRepository _userRepository;

        public UserApplicationService(IUserApplicationRepository applicationRepository, UserManager<ApplicationUser> userManager, IUserRepository userRepository)
        {
            _applicationRepository = applicationRepository;
            _userManager = userManager;
            _userRepository = userRepository;
        }

        public async Task CreateTrainingApplicationAsync(TrainingApplicationRequest request, string userId)
        {
            var user = await _userRepository.GetAsync(userId);
            TrainingApplication trainingApplication = Mapper.MapToTrainingApplication(request, user!);
            await _applicationRepository.AddAsync(trainingApplication);
        }

        public async Task<IEnumerable<ManagerInfo>> GetManagersAsync()
        {
            var managers = await _userManager.GetUsersInRoleAsync("Manager");
            return managers.Select(Mapper.MapToManagerInfo).ToList();
        }

        public async Task<DetaileTrainingApplicationResponse?> GetTrainingApplicationAsync(int applicationId)
        {
            var application = await _applicationRepository.GetAsync(applicationId);
            if (application == null)
                return null; ;
            return Mapper.MapToDetaileTrainingApplicationResponse(application);
        }

        public async Task<SelectedCourseResponse?> GetSelectedCourseAsync(int applicationId)
        {
            var selectedCourse = await _applicationRepository.GetSelectedCourseAsync(applicationId);
            if (selectedCourse == null)
            {
                return null;
            }
            var application = await _applicationRepository.GetAsync(applicationId);
            var response = Mapper.MapToSelectedCourseResponse(selectedCourse, application!);
            return response;
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetTrainingApplicationsAsync(string userId)
        {
            var applications = await _applicationRepository.GetApplicationsAsync(userId);
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync(string userId)
        {
            var applications = await _applicationRepository.GetArchivedApplicationsAsync(userId);
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }

        public async Task CreateCommentAsync(CommentCreation commentCreation, string userId)
        {
            var comment = Mapper.mapToComment(commentCreation, userId);
            await _applicationRepository.AddCommentAsync(comment);
        }
    }
}
