namespace external_training.Controllers.DtoModels
{
    public class DetaileTrainingApplicationResponse
    {
        public int TrainingApplicationId { get; set; }
        public string TrainingTopic { get; set; } = string.Empty;
        public string SimilarPrograms { get; set; } = string.Empty;
        public string RelevanceReason { get; set; } = string.Empty;
        public string TrainingGoals { get; set; } = string.Empty;
        public string SkillsToBeAcquired { get; set; } = string.Empty;
        public string ApplicationNotes { get; set; } = string.Empty;
        public string ApplicationUserName { get; set; } = string.Empty;
        public string ApplicationUserId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Department { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
        public ICollection<SoloManagerDto> ApprovingManagers { get; set; } = new List<SoloManagerDto>();
        public ICollection<PersonInfo> Participants { get; set; } = new List<PersonInfo>();
        public CourseDto Course { get; set; } = new CourseDto();
    }
}
