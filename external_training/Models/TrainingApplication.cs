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

        public int DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; } = null!;

        public int TeamId { get; set; }
        [ForeignKey("TeamId")]
        public virtual Team Team { get; set; } = null!;

        public string TraineesNames { get; set; } = null!;
        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public string RelevanceReason { get; set; } = null!;
        public string TrainingGoals { get; set; } = null!;
        public string SkillsToBeAcquired { get; set; } = null!;
        public DateTime DesiredTrainingDate { get; set; }
        public string SimilarPrograms { get; set; } = null!;
        public decimal EstimatedCostPerParticipant { get; set; }

        public bool IsApprovedByManager { get; set; }

        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public virtual SelectedTrainingCourse? SelectedCourse { get; set; }
    }
}
