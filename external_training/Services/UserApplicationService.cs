using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;
using external_training.SoloIntegration;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Xml.Linq;

namespace external_training.Services
{
    public class UserApplicationService : IUserApplicationService
    {
        private readonly IUserApplicationRepository _applicationRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly OrgStructureRepository _orgStructureRepository;

        public UserApplicationService(IUserApplicationRepository applicationRepository, UserManager<ApplicationUser> userManager, IUserRepository userRepository, INotificationRepository notificationRepository, OrgStructureRepository orgStructureRepository)
        {
            _applicationRepository = applicationRepository;
            _userManager = userManager;
            _userRepository = userRepository;
            _notificationRepository = notificationRepository;
            _orgStructureRepository = orgStructureRepository;
        }

        public async Task CreateTrainingApplicationAsync(TrainingApplicationRequest request, string userId)
        {
            var user = await _userRepository.GetAsync(userId);
            var managers = request.ApprovingManagerSoloAppointmentIds
                .Select(_orgStructureRepository.GetManagerByAppointment).ToList();
            var participants = request.ParticipantSoloPersonIds
                .Select(_orgStructureRepository.GetPerson).ToList();

            TrainingApplication trainingApplication = Mapper.MapToTrainingApplication(request, user!, managers, participants);
            var applicationId = await _applicationRepository.AddAsync(trainingApplication);
            var adminNotification = new Notification
            {
                Text = "Новая заявка",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = applicationId,
                UserId = "df416651-c71f-4384-be1d-f164890218ab"
            };
            await _notificationRepository.AddNotificationAsync(adminNotification);
        }

        public async Task ReplaceParticipantsAsync(ReplaceParticipantsDto replace)
        {
            var newParticipants = replace.NewPersonIds.Select(_orgStructureRepository.GetPerson).Select(Mapper.MapToApplicationParticipant);
            await _applicationRepository.ReplaceParticipantsAsync(replace.ApplicationId, newParticipants);
            var application = await _applicationRepository.GetAsync(replace.ApplicationId);
            if (application == null)
                return;
            var adminNotification = new Notification
            {
                Text = "Изменён состав участников",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = application.TrainingApplicationId,
                UserId = "df416651-c71f-4384-be1d-f164890218ab"
            };
            await _notificationRepository.AddNotificationAsync(adminNotification);
        }

        public async Task ReplaceManagersAsync(ReplaceManagersDto replace)
        {
            var newManagers = replace.NewManagerAppointmentIds.Select(_orgStructureRepository.GetManagerByAppointment).Select(Mapper.MapToApprovingManager);
            await _applicationRepository.ReplaceManagersAsync(replace.ApplicationId, newManagers);
            var application = await _applicationRepository.GetAsync(replace.ApplicationId);
            if (application == null)
                return;
            var adminNotification = new Notification
            {
                Text = "Изменён состав согласующих",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = application.TrainingApplicationId,
                UserId = "df416651-c71f-4384-be1d-f164890218ab"
            };
            await _notificationRepository.AddNotificationAsync(adminNotification);
        }

        public async Task EditDesiredCourse(CourseDto courseDto)
        {
            var course = Mapper.MapToDesiredCourse(courseDto);
            await _applicationRepository.EditDesiredCourse(course);
            var application = await _applicationRepository.GetAsync(courseDto.TrainingApplicationId);
            if (application == null)
                return;
            var adminNotification = new Notification
            {
                Text = "Предполагаемый курс был изменён",
                CreatedAt = DateTime.UtcNow,
                TrainingApplicationId = courseDto.TrainingApplicationId,
                UserId = "df416651-c71f-4384-be1d-f164890218ab"
            };
            await _notificationRepository.AddNotificationAsync(adminNotification);
        }

        public async Task<IEnumerable<SoloManagerDto>> GetManagersAsync(string userId)
        {
            var user = await _userRepository.GetAsync(userId);
            var managers = _orgStructureRepository.GetManagers(user!.UserName!);
            return managers;
        }

        public IEnumerable<PersonInfo> GetAllSoloEmployees()
        {
            var persons = _orgStructureRepository.GetAllEmployees();
            return persons.Select(Mapper.MapToPersonInfo);
        }

        public async Task<DetaileTrainingApplicationResponse?> GetTrainingApplicationAsync(int applicationId)
        {
            var application = await _applicationRepository.GetAsync(applicationId);
            if (application == null)
                return null; ;
            return Mapper.MapToDetaileTrainingApplicationResponse(application);
        }

        public async Task<SelectedCourseResponse?> GetCourseAsync(int applicationId)
        {
            var course = await _applicationRepository.GetCourseAsync(applicationId);
            if (course == null)
            {
                return null;
            }
            var response = Mapper.MapToSelectedCourseResponse(course);
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
                UserId = "df416651-c71f-4384-be1d-f164890218ab"
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

        public async Task<IEnumerable<SelectedCourseResponse>> GetActiveCoursesAsync()
        {
            var courses = await _applicationRepository.GetActiveCoursesAsync();
            var mappedCourses = new List<SelectedCourseResponse>();
            foreach (var course in courses)
            {
                Course? c = course;
                mappedCourses.Add(Mapper.MapToSelectedCourseResponse(c)!);
            }
            return mappedCourses;
        }

        public async Task<IEnumerable<EventResponse>> GetEventsAsync()
        {
            var events = await _applicationRepository.GetActiveCoursesAsync();
            return events.Select(Mapper.MapToEventResponse).ToList();
        }
    }
}
