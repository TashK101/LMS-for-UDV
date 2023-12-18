namespace external_training.Controllers.DtoModels
{
    public class TrainingApplicationRequest
    {
        public string TrainingTopic { get; set; } = string.Empty;
        public int PlannedParticipantsCount { get; set; }
        public string PlannedParticipantsNames { get; set; } = string.Empty;
        public string DesiredManagerId { get; set; } = string.Empty;
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
    }
}
