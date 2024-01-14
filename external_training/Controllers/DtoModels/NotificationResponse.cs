namespace external_training.Controllers.DtoModels
{
    public class NotificationResponse
    {
        public int TrainingApplicationId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string TrainingTopic { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
