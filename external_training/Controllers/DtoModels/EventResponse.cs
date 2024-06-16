namespace external_training.Controllers.DtoModels
{
    public class EventResponse
    {
        public int TrainingApplicationId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public string UserFullName { get; set; } = string.Empty;
        public bool IsOnline { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
    }
}
