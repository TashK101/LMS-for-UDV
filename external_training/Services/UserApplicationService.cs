using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using System;
using System.Xml.Linq;

namespace external_training.Services
{
    public class UserApplicationService : IUserApplicationService
    {
        private readonly IUserApplicationRepository _applicationRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserRepository _userRepository;
        private INotificationRepository _notificationRepository;

        public UserApplicationService(IUserApplicationRepository applicationRepository, UserManager<ApplicationUser> userManager, IUserRepository userRepository, INotificationRepository notificationRepository)
        {
            _applicationRepository = applicationRepository;
            _userManager = userManager;
            _userRepository = userRepository;
            _notificationRepository = notificationRepository;
        }

        public async Task CreateTrainingApplicationAsync(TrainingApplicationRequest request, string userId)
        {
            var user = await _userRepository.GetAsync(userId);
            TrainingApplication trainingApplication = Mapper.MapToTrainingApplication(request, user!);
            var applicationId = await _applicationRepository.AddAsync(trainingApplication);
            var managerNotification = new Notification
            {
                Text = "Новая заявка для одобрения",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = applicationId,
                UserId = trainingApplication.ManagerId
            };
            await _notificationRepository.AddNotificationAsync(managerNotification);
            var adminNotification = new Notification
            {
                Text = "Новая заявка",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = applicationId,
                UserId = "1e27f5cd-ba5c-48fa-bf4c-250e67a29ae9"
            };
            await _notificationRepository.AddNotificationAsync(adminNotification);
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
            var adminNotification = new Notification
            {
                Text = "Новый комментарий",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = comment.TrainingApplicationId,
                UserId = "1e27f5cd-ba5c-48fa-bf4c-250e67a29ae9"
            };
            await _notificationRepository.AddNotificationAsync(adminNotification);
        }

        public async Task<IEnumerable<CommentDto>> GetComments(int applicationId)
        {
            var comments = await _applicationRepository.GetComments(applicationId);
            return comments.Select(Mapper.MapToCommentDto).ToList();
        }

        public async Task<IEnumerable<NotificationResponse>> GetNotificationsAsync(string userId)
        {
            var notifications = await _notificationRepository.GetNotificationsAsync(userId);
            return notifications.Select(Mapper.MapToNotificationResponse).ToList();
        }
    }
}
