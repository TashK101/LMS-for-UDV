using external_training.Data;
using external_training.Models;
using Microsoft.EntityFrameworkCore;

namespace external_training.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly ApplicationDbContext _context;

        public NotificationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddNotificationAsync(Notification notification)
        {
            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Notification>> GetNotificationsAsync(string userId)
        {
            return await _context.Notifications
                .Include(n => n.TrainingApplication)
                .Where(n => n.UserId == userId)
                .ToListAsync();
        }
    }
}
