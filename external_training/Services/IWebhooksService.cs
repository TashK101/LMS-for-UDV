using external_training.Controllers.DtoModels;

namespace external_training.Services
{
    public interface IWebhooksService
    {
        Task changeApprovalState(ApplicationStateDto state);
    }
}
