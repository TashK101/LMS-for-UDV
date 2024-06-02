namespace external_training.Controllers.DtoModels
{
    public class CourseRequest
    {
        public string Name { get; set; } = string.Empty;
        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string TrainingCenter { get; set; } = string.Empty;
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public decimal CostPerParticipant { get; set; }
        public decimal TotalCost { get; set; }
    }
}
