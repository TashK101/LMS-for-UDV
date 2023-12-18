namespace external_training.Controllers.DtoModels
{
    public class CommentDto
    {
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
