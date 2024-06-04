using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;
using external_training.SoloIntegration;
using Microsoft.AspNetCore.Identity;
using static System.Net.Mime.MediaTypeNames;

namespace external_training.Services
{
    public class AdminApplicationService : IAdminApplicationService
    {
        private readonly IAdminApplicationRepository _adminApplicationRepository;
        private readonly IUserApplicationRepository _userApplicationRepository;
        private SoloApplicationRepository _soloApplicationRepository;
        private INotificationRepository _notificationRepository;
        private readonly OrgStructureRepository _orgStructureRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminApplicationService(IAdminApplicationRepository adminApplicationRepository, IUserApplicationRepository userApplicationRepository, SoloApplicationRepository soloApplicationRepository, INotificationRepository notificationRepository, OrgStructureRepository orgStructureRepository, UserManager<ApplicationUser> userManager)
        {
            _adminApplicationRepository = adminApplicationRepository;
            _userApplicationRepository = userApplicationRepository;
            _soloApplicationRepository = soloApplicationRepository;
            _notificationRepository = notificationRepository;
            _orgStructureRepository = orgStructureRepository;
            _userManager = userManager;
        }

        public async Task EditCourse(CourseDto courseDto)
        {
            var course = Mapper.MapToCourse(courseDto);
            await _adminApplicationRepository.EditCourse(course);
            var application = await _userApplicationRepository.GetAsync(courseDto.TrainingApplicationId);
            if (application == null)
                return;
            var userNotification = new Notification
            {
                Text = "Курс был изменён",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = courseDto.TrainingApplicationId,
                UserId = application.UserId
            };
            await _notificationRepository.AddNotificationAsync(userNotification);
        }

        public async Task ReplaceManagersAsync(ReplaceManagersDto replace)
        {
            var newManagers = replace.NewManagerAppointmentIds.Select(_orgStructureRepository.GetManagerByAppointment).Select(Mapper.MapToApprovingManager);
            await _adminApplicationRepository.ReplaceManagersAsync(replace.ApplicationId, newManagers);
            var application = await _userApplicationRepository.GetAsync(replace.ApplicationId);
            if (application == null)
                return;
            var userNotification = new Notification
            {
                Text = "Изменён состав согласующих",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = application.TrainingApplicationId,
                UserId = application.UserId
            };
            await _notificationRepository.AddNotificationAsync(userNotification);
        }

        public async Task<bool> SendApplicationToSolo(int applicationId)
        {
            var application = await _userApplicationRepository.GetAsync(applicationId);
            if (application == null)
                return false;
            if (application.Status == ApplicationStatus.AwaitingManagerApproval || application.Status == ApplicationStatus.AwaitingDepartmentManagerApproval)
                return false;
            var soloDocumentId = await _soloApplicationRepository.CreatApplicationInSoloAsync(application);
            await _adminApplicationRepository.UpdateSoloDocumentIdAsync(applicationId, soloDocumentId);
            await _adminApplicationRepository.ChangeStatusAsync(applicationId, ApplicationStatus.AwaitingManagerApproval);
            var userNotification = new Notification
            {
                Text = "Заявка отправлена на согласование в Соло",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = application.TrainingApplicationId,
                UserId = application.UserId
            };
            await _notificationRepository.AddNotificationAsync(userNotification);
            return true;
        }

        public async Task<IEnumerable<SoloManagerDto>> GetManagersAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var managers = _orgStructureRepository.GetManagers(user!.UserName!);
            return managers;
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
            if (aplication == null)
                return;
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
                var result = await _adminApplicationRepository.ChangeStatusAsync(applicationId, enumStatus);
                var application = await _userApplicationRepository.GetAsync(applicationId);
                if (application == null)
                    return false;
                var userNotification = new Notification
                {
                    Text = "Изменён статус заявки",
                    CreatedAt = DateTime.UtcNow,
                    TrainingApplicationId = application.TrainingApplicationId,
                    UserId = application.UserId
                };
                await _notificationRepository.AddNotificationAsync(userNotification);
                return result;
            }
            return false;
        }
    }
}
