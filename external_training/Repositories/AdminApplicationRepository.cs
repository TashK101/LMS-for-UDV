﻿using external_training.Data;
using external_training.Models;
using Microsoft.EntityFrameworkCore;

namespace external_training.Repositories
{
    public class AdminApplicationRepository : IAdminApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public AdminApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TrainingApplication>> GetPendingApplicationsAsync()
        {
            return await _context.TrainingApplications
                .Include(a => a.Comments)
                .Where(a => a.IsArchived == false)
                .ToListAsync();
        }

        public async Task<IEnumerable<TrainingApplication>> GetArchivedApplicationsAsync()
        {
            return await _context.TrainingApplications
                .Include(a => a.Comments)
                .Where(a => a.IsArchived)
                .ToListAsync();
        }

        public async Task AddCourse(SelectedTrainingCourse course)
        {
            await _context.SelectedTrainingCourses.AddAsync(course);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ChangeStatusAsync(int applicationId, ApplicationStatus status)
        {
            var updateCount = await _context.TrainingApplications
                .Where(a => a.TrainingApplicationId == applicationId)
                .ExecuteUpdateAsync(
                    s => s.SetProperty(a => a.Status, a => status));
            if (updateCount > 0)
                return true;
            return false;
        }
    }
}