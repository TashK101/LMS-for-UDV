using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace external_training.Models
{
    public enum TrainingStatus
    {
        AwaitingContract,
        AwaitingPayment,
        AwaitingContractAndPayment
    }

    public class SelectedTrainingCourse
    {
        [Key]
        public int SelectedTrainingCourseId { get; set; }

        [EnumDataType(typeof(TrainingStatus))]
        public TrainingStatus Status { get; set; }

        public string CourseName { get; set; } = null!;
        public bool IsCourseOnline { get; set; }
        public decimal CostPerParticipant { get; set; }
        public decimal TotalCost { get; set; }

        public int TrainingApplicationId { get; set; }
        [ForeignKey("TrainingApplicationId")]
        public virtual TrainingApplication TrainingApplication { get; set; } = null!;
    }
}
