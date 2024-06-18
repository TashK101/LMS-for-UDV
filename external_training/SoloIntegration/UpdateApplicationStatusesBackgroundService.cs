using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;
using Microsoft.AspNetCore.Http;
using System;

namespace external_training.SoloIntegration
{
    public class UpdateApplicationStatusesBackgroundService : BackgroundService
    {
        private readonly ILogger<UpdateApplicationStatusesBackgroundService> _logger;
        private readonly IServiceScopeFactory _scopeFactory;

        public UpdateApplicationStatusesBackgroundService(ILogger<UpdateApplicationStatusesBackgroundService> logger, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {

                using (var scope = _scopeFactory.CreateScope())
                {
                    var userApplicationRepository = scope.ServiceProvider.GetRequiredService<IUserApplicationRepository>();
                    var adminApplicationRepository = scope.ServiceProvider.GetRequiredService<IAdminApplicationRepository>();
                    var notificationRepository = scope.ServiceProvider.GetRequiredService<INotificationRepository>();
                    var applications = await adminApplicationRepository.GetPendingApplicationsAsync();
                    await StartTrainingForApplicationsAsync(applications, userApplicationRepository, adminApplicationRepository, notificationRepository);
                    await CompleteTrainingForApplicationsAsync(applications, userApplicationRepository, adminApplicationRepository, notificationRepository);
                    _logger.LogInformation("Executing background task...");

                }
                await Task.Delay(TimeSpan.FromMinutes(30), stoppingToken);
            }
        }

        private static async Task StartTrainingForApplicationsAsync(IEnumerable<TrainingApplication> applications, IUserApplicationRepository userApplicationRepository, IAdminApplicationRepository adminApplicationRepository, INotificationRepository notificationRepository)
        {
            var currentDate = DateTime.UtcNow.Date;
            foreach (var application in applications)
            {
                if (application.Status == ApplicationStatus.AwaitingTraining)
                {
                    var fullApplication = await userApplicationRepository.GetAsync(application.TrainingApplicationId)!;
                    if (currentDate >= fullApplication.Course!.Begin.Date && currentDate <= fullApplication.Course!.End.Date)
                    {
                        await adminApplicationRepository.ChangeStatusAsync(fullApplication.TrainingApplicationId, ApplicationStatus.TrainingInProgress);
                        var adminNotification = new Notification
                        {
                            Text = "Началось обучение",
                            CreatedAt = DateTime.UtcNow,
                            TrainingApplicationId = fullApplication.TrainingApplicationId,
                            UserId = "df416651-c71f-4384-be1d-f164890218ab"
                        };
                        await notificationRepository.AddNotificationAsync(adminNotification);
                        var userNotification = new Notification
                        {
                            Text = "Началось обучение",
                            CreatedAt = DateTime.UtcNow,
                            TrainingApplicationId = fullApplication.TrainingApplicationId,
                            UserId = fullApplication.UserId
                        };
                        await notificationRepository.AddNotificationAsync(userNotification);
                    }
                }
            }
        }

        private static async Task CompleteTrainingForApplicationsAsync(IEnumerable<TrainingApplication> applications, IUserApplicationRepository userApplicationRepository, IAdminApplicationRepository adminApplicationRepository, INotificationRepository notificationRepository)
        {
            var currentDate = DateTime.UtcNow.Date;
            foreach (var application in applications)
            {
                if (application.Status == ApplicationStatus.TrainingInProgress)
                {
                    var fullApplication = await userApplicationRepository.GetAsync(application.TrainingApplicationId)!;
                    if (currentDate > fullApplication.Course!.End.Date)
                    {
                        await adminApplicationRepository.ChangeStatusAsync(fullApplication.TrainingApplicationId, ApplicationStatus.TrainingCompleted);
                        var adminNotification = new Notification
                        {
                            Text = "Обучение закончилось",
                            CreatedAt = DateTime.UtcNow,
                            TrainingApplicationId = fullApplication.TrainingApplicationId,
                            UserId = "df416651-c71f-4384-be1d-f164890218ab"
                        };
                        await notificationRepository.AddNotificationAsync(adminNotification);
                        var userNotification = new Notification
                        {
                            Text = "Обучение закончилось",
                            CreatedAt = DateTime.UtcNow,
                            TrainingApplicationId = fullApplication.TrainingApplicationId,
                            UserId = fullApplication.UserId
                        };
                        await notificationRepository.AddNotificationAsync(userNotification);
                    }
                }
            }
        }
    }
}
