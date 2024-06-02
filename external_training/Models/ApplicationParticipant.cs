using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace external_training.Models
{
    public class ApplicationParticipant
    {
        [Key]
        public int Id { get; set; }

        public Guid SoloPersonId { get; set; }
        public string LastName { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;

        public int TrainingApplicationId { get; set; }
        [ForeignKey("TrainingApplicationId")]
        public virtual TrainingApplication TrainingApplication { get; set; } = null!;
    }
}
