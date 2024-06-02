using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace external_training.Models
{
    public class ApplicationUser : IdentityUser
    {
        public Guid? SoloPersonId { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Team { get; set; } = "Default";
        public string Department { get; set; } = "Default";

        public virtual ICollection<TrainingApplication> TrainingApplications { get; set; } = new List<TrainingApplication>();
    }
}