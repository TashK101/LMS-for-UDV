using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Repositories;

namespace external_training.Services
{
    public class ManagerApplicationService : IManagerApplicationService
    {
        private readonly IManagerApplicationRepository _managerApplicationRepository;
        private readonly IUserApplicationRepository _userApplicationRepository;

        public ManagerApplicationService(IManagerApplicationRepository managerApplicationRepository, IUserApplicationRepository userApplicationRepository)
        {
            _managerApplicationRepository = managerApplicationRepository;
            _userApplicationRepository = userApplicationRepository;
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplicationsAsync(string managerId)
        {
            var applications = await _managerApplicationRepository.GetPendingApplicationsAsync(managerId);
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }

        public async Task<IEnumerable<ShortTrainingApplicationResponse>> GetArchivedApplicationsAsync(string managerId)
        {
            var applications = await _managerApplicationRepository.GetArchivedApplicationsAsync(managerId);
            return applications.Select(Mapper.MapToShortTrainingApplicationResponse).ToList();
        }

        public async Task<bool> DeclineApplicationAsync(int applicationId)
        {
            var application = await _userApplicationRepository.GetAsync(applicationId);
            if (application == null)
                return false;
            else if (application.Status != ApplicationStatus.AwaitingManagerApproval)
                return false;
            return await _managerApplicationRepository.DeclineApplicationAsync(applicationId);
        }

        public async Task<bool> AcceptApplicationAsync(int applicationId)
        {
            var application = await _userApplicationRepository.GetAsync(applicationId);
            if (application == null)
                return false;
            else if (application.Status != ApplicationStatus.AwaitingManagerApproval)
                return false;
            return await _managerApplicationRepository.AcceptApplicationAsync(applicationId);
        }
    }
}
