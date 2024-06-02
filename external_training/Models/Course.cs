using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace external_training.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        public string Name { get; set; } = null!;
        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public bool IsPublic { get; set; }
        public string Category { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string TrainingCenter { get; set; } = null!;
        public decimal CostPerParticipant { get; set; }
        public decimal TotalCost { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }

        public int TrainingApplicationId { get; set; }
        [ForeignKey("TrainingApplicationId")]
        public virtual TrainingApplication TrainingApplication { get; set; } = null!;
    }
}
