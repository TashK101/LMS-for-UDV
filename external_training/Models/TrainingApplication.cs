using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace external_training.Models
{
    public class TrainingApplication
    {
        [Key]
        public int TrainingApplicationId { get; set; }

        public Guid SoloDocumentId { get; set; }
        public string TrainingTopic { get; set; } = null!;
        public string SimilarPrograms { get; set; } = null!;
        public string RelevanceReason { get; set; } = null!;
        public string TrainingGoals { get; set; } = null!;
        public string SkillsToBeAcquired { get; set; } = null!;
        public string ApplicationNotes { get; set; } = null!;

        [EnumDataType(typeof(ApplicationStatus))]
        public ApplicationStatus Status { get; set; }
        public bool IsArchived { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string UserId { get; set; } = null!;
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; } = null!;

        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public virtual ICollection<ApprovingManager> ApprovingManagers { get; set; } = new List<ApprovingManager>();

        public virtual ICollection<ApplicationParticipant> ApplicationParticipants { get; set; } = new List<ApplicationParticipant>();

        public virtual Course Course { get; set; } = default!;
    }
}
