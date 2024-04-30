using OrgStructure.Model;

namespace external_training.SoloIntegration
{
    public class OrgStructure
    {
        public readonly Organization _org;

        public OrgStructure(Organization org)
        {
            _org = org;
        }

        public IReadOnlyList<Person> GetAllEmployees()
        {
            return _org.People.OrderedByFullName;
        }

        public Person? GetPersonByEmail(string email)
        {
            return _org.People.FirstOrDefault(x => x.Email == email);
        }

        public Person GetManager(Guid employeeId)
        {
            throw new NotImplementedException();
        }

    }
}
