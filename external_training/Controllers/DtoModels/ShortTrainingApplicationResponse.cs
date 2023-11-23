namespace external_training.Controllers.DtoModels
{
    public class ShortTrainingApplicationResponse
    {
        public int TrainingApplicationId { get; set; }
        public string TrainingTopic { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; } = string.Empty;
        public int CommentsCount { get; set; }
    }
}
