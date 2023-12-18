using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace external_training.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
    }
}
