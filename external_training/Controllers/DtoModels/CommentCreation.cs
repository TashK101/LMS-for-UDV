namespace external_training.Controllers.DtoModels
{
    public class CommentCreation
    {
        public int TrainingApplicationId { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
