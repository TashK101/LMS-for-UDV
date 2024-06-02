using external_training.Models;

namespace external_training.Controllers.DtoModels
{
    public class TrainingApplicationRequest
    {
        public string TrainingTopic { get; set; } = string.Empty;
        public string SimilarPrograms { get; set; } = string.Empty;
        public string RelevanceReason { get; set; } = string.Empty;
        public string TrainingGoals { get; set; } = string.Empty;
        public string SkillsToBeAcquired { get; set; } = string.Empty;
        public string ApplicationNotes { get; set; } = string.Empty;
        public HashSet<Guid> ApprovingManagerSoloAppointmentIds { get; set; } = new HashSet<Guid>();
        public HashSet<Guid> ParticipantSoloPersonIds { get; set; } = new HashSet<Guid>();
        public CourseRequest Course { get; set; } = new CourseRequest();
    }
}
