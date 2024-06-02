namespace external_training.Controllers.DtoModels
{
    public class PersonInfo
    {
        public Guid SoloPersonId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
    }
}
