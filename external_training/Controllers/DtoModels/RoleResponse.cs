namespace external_training.Controllers.DtoModels
{
    public class RoleResponse
    {
        public string UserId { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string UserFullName { get; set; } = string.Empty;
        public Guid? SoloPersonId { get; set; }
        public string RoleName { get; set; } = string.Empty;
    }
}
