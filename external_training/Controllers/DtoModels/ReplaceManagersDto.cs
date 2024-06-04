namespace external_training.Controllers.DtoModels
{
    public class ReplaceManagersDto
    {
        public int ApplicationId { get; set; }
        public HashSet<Guid> NewManagerAppointmentIds { get; set; } = new HashSet<Guid>();
    }
}
