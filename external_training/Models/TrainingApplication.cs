using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace external_training.Models
{
    public class TrainingApplication
    {
        [Key]
        public int TrainingApplicationId { get; set; }

        public string TrainingTopic { get; set; } = null!;
        public int PlannedParticipantsCount { get; set; }
        public string PlannedParticipantsNames { get; set; } = null!;
        public string DesiredManagerName { get; set; } = null!;

        public int DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; } = null!;

        public int TeamId { get; set; }
        public virtual Team Team { get; set; } = null!;

        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public DateTime DesiredBegin { get; set; }
        public DateTime DesiredEnd { get; set; }
        public decimal EstimatedCostPerParticipant { get; set; }
        public string SimilarPrograms { get; set; } = null!;
        public string RelevanceReason { get; set; } = null!;
        public string TrainingGoals { get; set; } = null!;
        public string SkillsToBeAcquired { get; set; } = null!;
        public string ApplicationNotes { get; set; } = null!;

        public bool IsApprovedByManager { get; set; }
        public bool IsArchived { get; set; }

        [EnumDataType(typeof(ApplicationStatus))]
        public ApplicationStatus Status { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public virtual SelectedTrainingCourse? SelectedCourse { get; set; }
    }
}
