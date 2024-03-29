﻿using external_training.Models;

namespace external_training.Repositories
{
    public interface IAdminApplicationRepository
    {
        Task AddCourse(SelectedTrainingCourse course);
        Task<bool> ChangeStatusAsync(int applicationId, ApplicationStatus status);
        Task<IEnumerable<TrainingApplication>> GetArchivedApplicationsAsync();
        Task<IEnumerable<TrainingApplication>> GetPendingApplicationsAsync();
    }
}