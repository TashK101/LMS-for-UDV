namespace external_training.Controllers.DtoModels
{
    public class ReplaceParticipantsDto
    {
        public int ApplicationId { get; set; }
        public HashSet<Guid> NewPersonIds { get; set; } = new HashSet<Guid>();
    }
}
