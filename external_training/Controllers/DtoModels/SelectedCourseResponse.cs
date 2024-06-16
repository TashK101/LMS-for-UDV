using static Azure.Core.HttpHeader;

namespace external_training.Controllers.DtoModels
{
    public class SelectedCourseResponse
    {
        public int CourseId { get; set; }
        public int TrainingApplicationId { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string TrainingCenter { get; set; } = string.Empty;
        public decimal CostPerParticipant { get; set; }
        public decimal TotalCost { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public List<string> ParticipantFullNames { get; set; } = new List<string>();
    }
}
