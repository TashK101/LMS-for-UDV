using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace external_training.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly IApplicationRepository _applicationRepository;

        public ApplicationService(IApplicationRepository applicationRepository)
        {
            _applicationRepository = applicationRepository;
        }

        public async Task CreateTrainingApplicationAsync(TrainingApplicationRequest request, string userId)
        {
            TrainingApplication trainingApplication = MapToTrainingApplication(request, userId);
            await _applicationRepository.AddAsync(trainingApplication);
        }

        private TrainingApplication MapToTrainingApplication(TrainingApplicationRequest request, string userId)
        {
            return new TrainingApplication
            {
                TrainingTopic = request.TrainingTopic,
                PlannedParticipantsCount = request.PlannedParticipantsCount,
                PlannedParticipantsNames = request.PlannedParticipantsNames,
                DesiredManagerName = request.DesiredManagerName,
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
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                Status = ApplicationStatus.AwaitingManagerApproval
            };
        }

        public async Task<DetaileTrainingApplicationResponse?> GetTrainingApplicationAsync(int applicationId)
        {
            var application = await _applicationRepository.GetAsync(applicationId);
            if (application == null)
                return null; ;
            return mapToDetaileTrainingApplicationResponse(application);
        }

        private DetaileTrainingApplicationResponse mapToDetaileTrainingApplicationResponse(TrainingApplication application)
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
                Comments = application.Comments.Select(mapToCommentDto).ToList(),
            };
            return ApplicationDto;
        }

        private CommentDto mapToCommentDto(Comment comment)
        {
            var CommentDto = new CommentDto
            {
                Content = comment.Content!,
                CreatedAt = comment.CreatedAt,
                UserId = comment.UserId
            };
            return CommentDto;
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetTrainingApplicationsAsync(string userId)
        {
            var applications = await _applicationRepository.GetApplicationsAsync(userId);
            return applications.Select(mapToShortTrainingApplicationResponse).ToList();
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync(string userId)
        {
            var applications = await _applicationRepository.GetArchivedApplicationsAsync(userId);
            return applications.Select(mapToShortTrainingApplicationResponse).ToList();
        }

        private ShortTrainingApplicationResponse mapToShortTrainingApplicationResponse(TrainingApplication application)
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

        public async Task CreateCommentAsync(CommentCreation commentCreation, string userId)
        {
            var comment = new Comment
            {
                TrainingApplicationId = commentCreation.TrainingApplicationId,
                Content = commentCreation.Comment,
                CreatedAt = DateTime.UtcNow,
                UserId = userId
            };

            await _applicationRepository.AddCommentAsync(comment);
        }
    }
}
