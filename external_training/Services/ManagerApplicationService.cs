using external_training.Controllers.DtoModels;
using external_training.Repositories;

namespace external_training.Services
{
    public class ManagerApplicationService : IManagerApplicationService
    {
        private readonly IManagerApplicationRepository _managerApplicationRepository;

        public ManagerApplicationService(IManagerApplicationRepository managerApplicationRepository)
        {
            _managerApplicationRepository = managerApplicationRepository;
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplications(string managerId)
        {
            var applications = await _managerApplicationRepository.GetPendingApplicationsAsync(managerId);
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }
    }
}
