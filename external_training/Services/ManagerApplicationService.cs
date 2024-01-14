using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;

namespace external_training.Services
{
    public class ManagerApplicationService : IManagerApplicationService
    {
        private readonly IManagerApplicationRepository _managerApplicationRepository;
        private readonly IUserApplicationRepository _userApplicationRepository;
        private INotificationRepository _notificationRepository;

        public ManagerApplicationService(IManagerApplicationRepository managerApplicationRepository, IUserApplicationRepository userApplicationRepository, INotificationRepository notificationRepository)
        {
            _managerApplicationRepository = managerApplicationRepository;
            _userApplicationRepository = userApplicationRepository;
            _notificationRepository = notificationRepository;
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplicationsAsync(string managerId)
        {
            var applications = await _managerApplicationRepository.GetPendingApplicationsAsync(managerId);
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync(string managerId)
        {
            var applications = await _managerApplicationRepository.GetArchivedApplicationsAsync(managerId);
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }

        public async Task<bool> DeclineApplicationAsync(int applicationId)
        {
            var application = await _userApplicationRepository.GetAsync(applicationId);
            if (application == null)
                return false;
            else if (application.Status != ApplicationStatus.AwaitingManagerApproval)
                return false;
            var status = await _managerApplicationRepository.DeclineApplicationAsync(applicationId);
            if (status)
            {
                var userNotification = new Notification
                {
                    Text = "Заявка отклонена",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = applicationId,
                    UserId = application.UserId
                };
                await _notificationRepository.AddNotificationAsync(userNotification);
                var adminNotification = new Notification
                {
                    Text = "Заявка отклонена",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = applicationId,
                    UserId = "1e27f5cd-ba5c-48fa-bf4c-250e67a29ae9"
                };
                await _notificationRepository.AddNotificationAsync(adminNotification);
            }
            return status;
        }

        public async Task<bool> AcceptApplicationAsync(int applicationId)
        {
            var application = await _userApplicationRepository.GetAsync(applicationId);
            if (application == null)
                return false;
            else if (application.Status != ApplicationStatus.AwaitingManagerApproval)
                return false;
            var status = await _managerApplicationRepository.AcceptApplicationAsync(applicationId);
            if (status)
            {
                var userNotification = new Notification
                {
                    Text = "Заявка одобрена согласующим",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = applicationId,
                    UserId = application.UserId
                };
                await _notificationRepository.AddNotificationAsync(userNotification);
                var adminNotification = new Notification
                {
                    Text = "Заявка одобрена согласующим",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = applicationId,
                    UserId = "1e27f5cd-ba5c-48fa-bf4c-250e67a29ae9"
                };
                await _notificationRepository.AddNotificationAsync(adminNotification);
            }
            return status;
        }

        public async Task CreateCommentAsync(CommentCreation commentCreation, string userId)
        {
            var comment = Mapper.mapToComment(commentCreation, userId);
            await _userApplicationRepository.AddCommentAsync(comment);
            var userNotification = new Notification
            {
                Text = "Новый комментарий",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = comment.TrainingApplicationId,
                UserId = comment.UserId
            };
            await _notificationRepository.AddNotificationAsync(userNotification);
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
            var comments = await _userApplicationRepository.GetComments(applicationId);
            return comments.Select(Mapper.MapToCommentDto).ToList();
        }
    }
}
