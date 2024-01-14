﻿using external_training.Controllers.DtoModels;
using external_training.Models;

namespace external_training.Services
{
    public static class Mapper
    {
        public static TrainingApplication MapToTrainingApplication(TrainingApplicationRequest request, ApplicationUser user)
        {
            return new TrainingApplication
            {
                TrainingTopic = request.TrainingTopic,
                PlannedParticipantsCount = request.PlannedParticipantsCount,
                PlannedParticipantsNames = request.PlannedParticipantsNames,
                ManagerId = request.DesiredManagerId,

                TeamId = user.TeamId ?? 0,
                DepartmentId = user.Team!.DepartmentId,
                IsTrainingOnline = request.IsTrainingOnline,
                IsCorporateTraining = request.IsCorporateTraining,
                DesiredBegin = request.DesiredBegin,
                DesiredEnd = request.DesiredEnd,
                EstimatedCostPerParticipant = request.EstimatedCostPerParticipant,
                SimilarPrograms = request.SimilarPrograms,
                RelevanceReason = request.RelevanceReason,
                TrainingGoals = request.TrainingGoals,
                SkillsToBeAcquired = request.SkillsToBeAcquired,
                ApplicationNotes = request.ApplicationNotes,
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow,
                Status = ApplicationStatus.AwaitingManagerApproval
            };
        }

        public static SelectedCourseResponse MapToSelectedCourseResponse(SelectedTrainingCourse selectedCourse, TrainingApplication application)
        {
            return new SelectedCourseResponse
            {
                TrainingApplicationId = application.TrainingApplicationId,
                TrainingTopic = application.TrainingTopic,
                Status = application.Status.ToString(),
                ApplicationUserId = application.UserId,
                DesiredManagerName = application.Manager.FullName,
                EducationalCenter = selectedCourse.EducationalCenter,
                CourseName = selectedCourse.CourseName,
                ParticipantsCount = selectedCourse.ParticipantsCount,
                ParticipantsNames = selectedCourse.ParticipantsNames,
                Department = application.Department?.Name ?? string.Empty,
                Team = application.Team?.Name ?? string.Empty,
                IsTrainingOnline = selectedCourse.IsTrainingOnline,
                IsCorporateTraining = selectedCourse.IsCorporateTraining,
                Begin = selectedCourse.Begin,
                End = selectedCourse.End,
                CostPerParticipant = selectedCourse.CostPerParticipant,
                Comments = application.Comments.Select(MapToCommentDto).ToList()
            };
        }

        public static DetaileTrainingApplicationResponse MapToDetaileTrainingApplicationResponse(TrainingApplication application)
        {
            var ApplicationDto = new DetaileTrainingApplicationResponse
            {
                TrainingApplicationId = application.TrainingApplicationId,
                TrainingTopic = application.TrainingTopic,
                Status = application.Status.ToString(),
                ApplicationUserName = application.User.UserName!,
                PlannedParticipantsCount = application.PlannedParticipantsCount,
                PlannedParticipantsNames = application.PlannedParticipantsNames,
                Department = application.Department.Name,
                Team = application.Team.Name,
                IsTrainingOnline = application.IsTrainingOnline,
                IsCorporateTraining = application.IsCorporateTraining,
                DesiredBegin = application.DesiredBegin,
                DesiredEnd = application.DesiredEnd,
                EstimatedCostPerParticipant = application.EstimatedCostPerParticipant,
                SimilarPrograms = application.SimilarPrograms,
                RelevanceReason = application.RelevanceReason,
                TrainingGoals = application.TrainingGoals,
                SkillsToBeAcquired = application.SkillsToBeAcquired,
                ApplicationNotes = application.ApplicationNotes,
                Comments = application.Comments.Select(MapToCommentDto).ToList(),
            };
            return ApplicationDto;
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
                TrainingTopic = application.TrainingTopic,
                CreatedAt = application.CreatedAt,
                Status = application.Status.ToString(),
                CommentsCount = application.Comments.Count,
            };
            return ApplicationDto;
        }

        public static ManagerInfo MapToManagerInfo(ApplicationUser manager)
        {
            var managerInfo = new ManagerInfo
            {
                ManagerId = manager.Id,
                FullName = manager.FullName
            };
            return managerInfo;
        }
    }
}
