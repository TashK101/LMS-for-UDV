using external_training.Controllers.DtoModels;
using external_training.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using OrgStructure.Model;

namespace external_training.Services
{
    public static class Mapper
    {
        public static TrainingApplication MapToTrainingApplication(TrainingApplicationRequest request, ApplicationUser user, List<SoloManagerDto> managers, List<Person> participants)
        {
            return new TrainingApplication
            {
                TrainingTopic = request.TrainingTopic,
                SimilarPrograms = request.SimilarPrograms,
                RelevanceReason = request.RelevanceReason,
                TrainingGoals = request.TrainingGoals,
                SkillsToBeAcquired = request.SkillsToBeAcquired,
                ApplicationNotes = request.ApplicationNotes,
                Status = ApplicationStatus.Editing,
                CreatedAt = DateTime.UtcNow,
                UserId = user.Id,
                ApprovingManagers = managers.Select(MapToApprovingManager).ToList(),
                ApplicationParticipants = participants.Select(MapToApplicationParticipant).ToList(),
                Course = new Course
                {
                    Name = request.Course.Name,
                    IsTrainingOnline = request.Course.IsTrainingOnline,
                    IsCorporateTraining = request.Course.IsCorporateTraining,
                    Category = request.Course.Category,
                    Description = request.Course.Description,
                    TrainingCenter = request.Course.TrainingCenter,
                    CostPerParticipant = request.Course.CostPerParticipant,
                    TotalCost = request.Course.TotalCost,
                    Begin = request.Course.Begin,
                    End = request.Course.End,
                }
            };
        }

        public static ApprovingManager MapToApprovingManager(SoloManagerDto managerDto)
        {
            return new ApprovingManager
            {
                SoloPersonId = managerDto.PersonId,
                SoloAppointmentId  = managerDto.AppointmentId,
                SoloPostName = managerDto.PostName,
                SoloOrgUnitName = managerDto.OrgUnitName,
                LastName = managerDto.LastName,
                FirstName = managerDto.FirstName,
                MiddleName = managerDto.MiddleName
            };
        }

        public static ApplicationParticipant MapToApplicationParticipant(Person person)
        {
            return new ApplicationParticipant
            {
                SoloPersonId = person.Id,
                LastName = person.LastName,
                FirstName = person.FirstName,
                MiddleName = person.MiddleName
            };
        }

        public static DetaileTrainingApplicationResponse MapToDetaileTrainingApplicationResponse(TrainingApplication application)
        {
            var applicationDto = new DetaileTrainingApplicationResponse
            {
                TrainingApplicationId = application.TrainingApplicationId,
                TrainingTopic = application.TrainingTopic,
                SimilarPrograms = application.SimilarPrograms,
                RelevanceReason = application.RelevanceReason,
                TrainingGoals = application.TrainingGoals,
                SkillsToBeAcquired = application.SkillsToBeAcquired,
                ApplicationNotes = application.ApplicationNotes,
                ApplicationUserName = application.User.FullName,
                ApplicationUserId = application.User.Id,
                Status = application.Status.ToString(),
                CreatedAt = application.CreatedAt,
                Department = application.User.Department,
                Team = application.User.Team,
                Comments = application.Comments.Select(MapToCommentDto).ToList(),
                ApprovingManagers = application.ApprovingManagers.Select(MapToSoloManagerDto).ToList(),
                Participants = application.ApplicationParticipants.Select(MapToPersonInfo).ToList(),
                Course = MapToCourseResponse(application.Course)
            };
            return applicationDto;
        }

        public static CommentDto MapToCommentDto(Comment comment)
        {
            var CommentDto = new CommentDto
            {
                Content = comment.Content!,
                CreatedAt = comment.CreatedAt,
                UserId = comment.UserId,
                UserFullName = comment.User.FullName
            };
            return CommentDto;
        }

        public static SoloManagerDto MapToSoloManagerDto(ApprovingManager manager)
        {
            return new SoloManagerDto
            {
                PersonId = manager.SoloPersonId,
                AppointmentId = manager.SoloAppointmentId,
                PostName = manager.SoloPostName,
                OrgUnitName = manager.SoloOrgUnitName,
                LastName = manager.LastName,
                FirstName = manager.FirstName,
                MiddleName = manager.MiddleName
            };
        }

        public static PersonInfo MapToPersonInfo(ApplicationParticipant participant)
        {
            return new PersonInfo
            {
                SoloPersonId = participant.SoloPersonId,
                FullName = participant.LastName + " " + participant.FirstName + " " + participant.MiddleName,
                LastName = participant.LastName,
                FirstName = participant.FirstName,
                MiddleName = participant.MiddleName
            };
        }

        public static CourseDto MapToCourseResponse(Course course)
        {
            return new CourseDto
            {
                CourseId = course.CourseId,
                TrainingApplicationId = course.TrainingApplicationId,
                Name = course.Name,
                IsTrainingOnline = course.IsTrainingOnline,
                IsCorporateTraining = course.IsCorporateTraining,
                Category = course.Category,
                Description = course.Description,
                TrainingCenter = course.TrainingCenter,
                CostPerParticipant = course.CostPerParticipant,
                TotalCost = course.TotalCost,
                Begin = course.Begin,
                End = course.End,
            };
        }

        public static Course MapToCourse(CourseDto courseDto)
        {
            return new Course
            {
                CourseId = courseDto.CourseId,
                TrainingApplicationId = courseDto.TrainingApplicationId,
                Name = courseDto.Name,
                IsTrainingOnline = courseDto.IsTrainingOnline,
                IsCorporateTraining = courseDto.IsCorporateTraining,
                Category = courseDto.Category,
                Description = courseDto.Description,
                TrainingCenter = courseDto.TrainingCenter,
                CostPerParticipant = courseDto.CostPerParticipant,
                TotalCost = courseDto.TotalCost,
                Begin = courseDto.Begin,
                End = courseDto.End,
            };
        }

        public static Comment mapToComment(CommentCreation commentCreation, string userId)
        {
            var comment = new Comment
            {
                TrainingApplicationId = commentCreation.TrainingApplicationId,
                Content = commentCreation.Comment,
                CreatedAt = DateTime.UtcNow,
                UserId = userId
            };
            return comment;
        }

        public static ShortTrainingApplicationResponse MapToShortTrainingApplicationResponse(TrainingApplication application)
        {
            var ApplicationDto = new ShortTrainingApplicationResponse
            {
                TrainingApplicationId = application.TrainingApplicationId,
                UserFullName = application.User.FullName,
                TrainingTopic = application.TrainingTopic,
                CreatedAt = application.CreatedAt,
                Status = application.Status.ToString(),
                CommentsCount = application.Comments.Count,
            };
            return ApplicationDto;
        }

        public static PersonInfo MapToPersonInfo(Person person)
        {
            var personInfo = new PersonInfo
            {
                SoloPersonId = person.Id,
                FullName = person.GetFullName(),
                LastName = person.LastName,
                FirstName = person.FirstName,
                MiddleName = person.MiddleName
            };
            return personInfo;
        }

        public static NotificationResponse MapToNotificationResponse(Notification notification)
        {
            var notificationResponse = new NotificationResponse
            {
                TrainingApplicationId = notification.TrainingApplicationId,
                UserId = notification.UserId,
                Text = notification.Text,
                TrainingTopic = notification.TrainingApplication.TrainingTopic,
                CreatedAt = notification.CreatedAt
            };
            return notificationResponse;
        }

        public static EventResponse MapToEventResponse(Course course)
        {
            var eventResponse = new EventResponse
            {
                TrainingApplicationId = course.TrainingApplicationId,
                CourseName = course.Name,
                Status = course.TrainingApplication.Status.ToString(),
                Begin = course.Begin,
                End = course.End
            };
            return eventResponse;
        }
    }
}
