namespace external_training.Controllers.DtoModels
{
    public class SelectedCourseRequest
    {
        public int TrainingApplicationId { get; set; }
        public string Status { get; set; } = string.Empty;
        public string EducationalCenter { get; set; } = string.Empty;
        public string CourseName { get; set; } = string.Empty;
        public int ParticipantsCount { get; set; }
        public string ParticipantsNames { get; set; } = string.Empty;
        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public decimal CostPerParticipant { get; set; }
    }
}
