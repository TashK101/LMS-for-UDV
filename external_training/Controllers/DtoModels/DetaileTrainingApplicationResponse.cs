namespace external_training.Controllers.DtoModels
{
    public class DetaileTrainingApplicationResponse
    {
        public int TrainingApplicationId { get; set; }
        public string TrainingTopic { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string DesiredManagerId { get; set; } = string.Empty;
        public string DesiredManagerName { get; set; } = string.Empty;
        public string ApplicationUserId { get; set; } = string.Empty;
        public string ApplicationUserName { get; set; } = string.Empty;
        public int PlannedParticipantsCount { get; set; }
        public string PlannedParticipantsNames { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public bool IsTrainingOnline { get; set; }
        public bool IsCorporateTraining { get; set; }
        public DateTime DesiredBegin { get; set; }
        public DateTime DesiredEnd { get; set; }
        public decimal EstimatedCostPerParticipant { get; set; }
        public string SimilarPrograms { get; set; } = string.Empty;
        public string RelevanceReason { get; set; } = string.Empty;
        public string TrainingGoals { get; set; } = string.Empty;
        public string SkillsToBeAcquired { get; set; } = string.Empty;
        public string ApplicationNotes { get; set; } = string.Empty;
        public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
    }
}
