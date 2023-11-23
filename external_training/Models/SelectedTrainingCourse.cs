using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace external_training.Models
{
    public class SelectedTrainingCourse
    {
        [Key]
        public int SelectedTrainingCourseId { get; set; }

        public string EducationalCenter { get; set; } = null!;
        public string CourseName { get; set; } = null!;
        public int ParticipantsCount { get; set; }
        public string ParticipantsNames { get; set; } = null!;
        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public decimal CostPerParticipant { get; set; }
        public decimal TotalCost { get; set; }

        public int TrainingApplicationId { get; set; }
        [ForeignKey("TrainingApplicationId")]
        public virtual TrainingApplication TrainingApplication { get; set; } = null!;
    }
}
