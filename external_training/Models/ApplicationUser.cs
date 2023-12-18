using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace external_training.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;

        public string? ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public virtual ApplicationUser? Manager { get; set; }

        public int? TeamId { get; set; }
        public Team? Team { get; set; }

        public virtual ICollection<TrainingApplication> TrainingApplications { get; set; } = new List<TrainingApplication>();
    }
}