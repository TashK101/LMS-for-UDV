namespace external_training.Controllers.DtoModels
{
    public class SelectedCourseResponse
    {
        public int TrainingApplicationId { get; set; }
        public string TrainingTopic { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string ApplicationUserName { get; set; } = string.Empty;
        public string DesiredManagerName { get; set; } = string.Empty;
        public string EducationalCenter { get; set; } = string.Empty;
        public string CourseName { get; set; } = string.Empty;
        public int ParticipantsCount { get; set; }
        public string ParticipantsNames { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public decimal CostPerParticipant { get; set; }
        public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
    }
}
