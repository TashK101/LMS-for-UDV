using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace external_training.Models
{
    public class ApprovingManager
    {
        [Key]
        public int Id { get; set; }

        public Guid SoloPersonId { get; set; }
        public Guid SoloAppointmentId { get; set; }
        public string SoloPostName { get; set; } = null!;
        public string SoloOrgUnitName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;

        public int TrainingApplicationId { get; set; }
        [ForeignKey("TrainingApplicationId")]
        public virtual TrainingApplication TrainingApplication { get; set; } = null!;
    }
}
