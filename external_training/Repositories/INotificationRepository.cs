using external_training.Models;

namespace external_training.Repositories
{
    public interface INotificationRepository
    {
        Task AddNotificationAsync(Notification notification);
        Task<IEnumerable<Notification>> GetNotificationsAsync(string userId);
    }
}