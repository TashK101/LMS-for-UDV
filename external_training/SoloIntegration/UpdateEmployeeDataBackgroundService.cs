namespace external_training.SoloIntegration
{
    public class UpdateEmployeeDataBackgroundService : BackgroundService
    {
        private readonly ILogger<UpdateEmployeeDataBackgroundService> _logger;
        private readonly OrgStructureRepository _orgStructure;

        public UpdateEmployeeDataBackgroundService(ILogger<UpdateEmployeeDataBackgroundService> logger, OrgStructureRepository orgStructure)
        {
            _logger = logger;
            _orgStructure = orgStructure;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var employees = _orgStructure.GetAllEmployees();

                _logger.LogInformation($"Retrieved {employees.Count} employees from Solo.");

                // Здесь вы можете выполнить дополнительную обработку полученных данных

                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}
