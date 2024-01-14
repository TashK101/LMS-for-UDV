using external_training.Controllers.DtoModels;

namespace external_training.Services
{
    public interface IManagerApplicationService
    {
        Task<IEnumerable<ShortTrainingApplicationResponse>> GetPendingApplications(string managerId);
    }
}