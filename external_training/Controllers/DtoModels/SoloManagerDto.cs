namespace external_training.Controllers.DtoModels
{
    public class SoloManagerDto
    {
        public Guid PersonId { get; set; }
        public Guid AppointmentId { get; set; }
        public string PostName { get; set; } = string.Empty;
        public string OrgUnitName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
    }
}
