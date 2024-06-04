namespace external_training.Controllers.DtoModels
{
    public class ApplicationStateDto
    {
        public Guid DocumentId { get; set; }
        public String State { get; set; } = string.Empty;
        public string? Comment { get; set; }
    }
}
