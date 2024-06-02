using external_training.Controllers.DtoModels;
using OrgStructure.Model;

namespace external_training.SoloIntegration
{
    public class OrgStructureRepository
    {
        public readonly Organization _org;

        public OrgStructureRepository(Organization org)
        {
            _org = org;
        }

        public IReadOnlyList<Person> GetAllEmployees()
        {
            return _org.People.OrderedByFullName;
        }

        public Person GetPerson(Guid personId)
        {
            return _org.People.First(x => x.Id== personId);
        }

        public Person? GetPersonByEmail(string email)
        {
            return _org.People.FirstOrDefault(x => x.Email == email);
        }

        public IEnumerable<SoloManagerDto> GetManagers(string email)
        {
            var employee = _org.People.FirstOrDefault(p => p.Email == email);
            if (employee == null)
                return new List<SoloManagerDto>();
            var orgUnits = employee.GetOperationOrgUnits();
            var managers = new List<SoloManagerDto>();
            foreach ( var orgUnit in orgUnits)
            {
                var dto = new SoloManagerDto
                {
                    PersonId = orgUnit.Chief.GetAppointedPerson().Id,
                    AppointmentId = orgUnit.Chief.Appointment.Id,
                    PostName = orgUnit.Chief.PostName,
                    OrgUnitName = orgUnit.Name,
                    LastName = orgUnit.Chief.GetAppointedPerson().LastName,
                    FirstName = orgUnit.Chief.GetAppointedPerson().FirstName,
                    MiddleName = orgUnit.Chief.GetAppointedPerson().MiddleName
                };
                managers .Add(dto);
            }
            return managers;
        }

        public SoloManagerDto GetManagerByAppointment(Guid appointmentId)
        {
            var appointment = _org.FindAppointment(appointmentId);
            var dto = new SoloManagerDto
            {
                PersonId = appointment.Person.Id,
                AppointmentId = appointment.Id,
                PostName = appointment.StaffPosition.PostName,
                OrgUnitName = appointment.StaffPosition.OrgUnit.Name,
                LastName = appointment.Person.LastName,
                FirstName = appointment.Person.FirstName,
                MiddleName = appointment.Person.MiddleName
            };
            return dto;
        }

    }
}
