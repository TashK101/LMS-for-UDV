using Azure.Core;
using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;
using external_training.SoloIntegration;
using Microsoft.AspNetCore.Identity;

namespace external_training.Services
{
    public class WebhooksService : IWebhooksService
    {
        private readonly IAdminApplicationRepository _adminApplicationRepository;
        private readonly IUserApplicationRepository _userApplicationRepository;
        private INotificationRepository _notificationRepository;

        public WebhooksService(IAdminApplicationRepository adminApplicationRepository, IUserApplicationRepository userApplicationRepository, INotificationRepository notificationRepository)
        {
            _adminApplicationRepository = adminApplicationRepository;
            _userApplicationRepository = userApplicationRepository;
            _notificationRepository = notificationRepository;
        }

        public async Task changeApprovalState(ApplicationStateDto state)
        {
            var application = await _userApplicationRepository.GetBySoloDocumentIdAsync(state.DocumentId);
            if (application == null)
                return;
            if (state.State == "Approved")
            {
                var course = new Course
                {
                    Name = application.DesiredCourse.Name,
                    IsTrainingOnline = application.DesiredCourse.IsTrainingOnline,
                    IsCorporateTraining = application.DesiredCourse.IsCorporateTraining,
                    Category = application.DesiredCourse.Category,
                    Description = application.DesiredCourse.Description,
                    TrainingCenter = application.DesiredCourse.TrainingCenter,
                    CostPerParticipant = application.DesiredCourse.CostPerParticipant,
                    TotalCost = application.DesiredCourse.TotalCost,
                    Begin = application.DesiredCourse.Begin,
                    End = application.DesiredCourse.End,
                    TrainingApplicationId = application.DesiredCourse.TrainingApplicationId
                };
                if (application.Course != null)
                    course.CourseId = application.Course.CourseId;
                await _adminApplicationRepository.EditCourse(course);
                await _adminApplicationRepository.ChangeStatusAsync(application.TrainingApplicationId, ApplicationStatus.CourseSelection);
                var userNotification = new Notification
                {
                    Text = "Заявка согласована руководителями",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = application.TrainingApplicationId,
                    UserId = application.UserId
                };
                await _notificationRepository.AddNotificationAsync(userNotification);
                var adminNotification = new Notification
                {
                    Text = "Заявка согласована руководителями",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = application.TrainingApplicationId,
                    UserId = "df416651-c71f-4384-be1d-f164890218ab"
                };
                await _notificationRepository.AddNotificationAsync(adminNotification);
            }
            else if (state.State == "Rejected")
            {
                await _adminApplicationRepository.ChangeStatusAsync(application.TrainingApplicationId, ApplicationStatus.NotApproved);
                var userNotification = new Notification
                {
                    Text = $"Заявка Не согласована руководителем. Комментарий: {state.Comment}",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = application.TrainingApplicationId,
                    UserId = application.UserId
                };
                await _notificationRepository.AddNotificationAsync(userNotification);
                var adminNotification = new Notification
                {
                    Text = $"Заявка Не согласована руководителем. Комментарий: {state.Comment}",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = application.TrainingApplicationId,
                    UserId = "df416651-c71f-4384-be1d-f164890218ab"
                };
                await _notificationRepository.AddNotificationAsync(adminNotification);
            }
        }
    }
}
