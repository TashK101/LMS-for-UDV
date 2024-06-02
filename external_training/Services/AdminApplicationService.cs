using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;

namespace external_training.Services
{
    public class AdminApplicationService : IAdminApplicationService
    {
        private readonly IAdminApplicationRepository _adminApplicationRepository;
        private readonly IUserApplicationRepository _userApplicationRepository;
        private INotificationRepository _notificationRepository;

        public AdminApplicationService(IAdminApplicationRepository adminApplicationRepository, IUserApplicationRepository userApplicationRepository, INotificationRepository notificationRepository)
        {
            _adminApplicationRepository = adminApplicationRepository;
            _userApplicationRepository = userApplicationRepository;
            _notificationRepository = notificationRepository;
        }

        public async Task EditCourse(CourseDto courseDto)
        {
            var course = Mapper.MapToCourse(courseDto);
            await _adminApplicationRepository.EditCourse(course);
            var application = await _userApplicationRepository.GetAsync(courseDto.TrainingApplicationId);
            var userNotification = new Notification
            {
                Text = "Подобран курс",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = courseDto.TrainingApplicationId,
                UserId = application.UserId
            };
            await _notificationRepository.AddNotificationAsync(userNotification);
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

        public async Task CreateCommentAsync(CommentCreation commentCreation, string userId)
        {
            var comment = Mapper.mapToComment(commentCreation, userId);
            await _userApplicationRepository.AddCommentAsync(comment);
            var aplication = await _userApplicationRepository.GetAsync(comment.TrainingApplicationId);
            var userNotification = new Notification
            {
                Text = "Новый комментарий",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = comment.TrainingApplicationId,
                UserId = aplication.UserId
            };
            await _notificationRepository.AddNotificationAsync(userNotification);
        }

        public async Task<IEnumerable<CommentDto>> GetComments(int applicationId)
        {
            var comments = await _userApplicationRepository.GetComments(applicationId);
            return comments.Select(Mapper.MapToCommentDto).ToList();
        }

        public async Task<bool> ChangeStatusAsync(int applicationId, string status)
        {
            if (status == "CourseSelection"
                || status == "AwaitingPayment"
                || status == "AwaitingContractAndPayment"
                || status == "AwaitingTraining"
                || status == "TrainingCanceled")
            {
                var enumStatus = (ApplicationStatus)Enum.Parse(typeof(ApplicationStatus), status);
                return await _adminApplicationRepository.ChangeStatusAsync(applicationId, enumStatus);
            }
            return false;
        }
    }
}
