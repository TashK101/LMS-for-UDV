using Demands.Contracts;
using Demands.DTO;
using Demands.DTO.Command;
using Demands.DTO.DocumentDetails;
using Demands.DTO.Employee;
using Demands.Ussc.DTO;
using external_training.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using OrgStructure.Model;
using WellKnown = Demands.Ussc.DTO.WellKnown;

namespace external_training.SoloIntegration
{
    public class SoloApplicationRepository
    {
        private readonly IDemandsApiContext _context;
        private readonly Organization _org;

        public SoloApplicationRepository(IDemandsApiContext context, Organization org)
        {
            _context = context;
            _org = org;
        }

        public async Task<Guid> CreatApplicationInSoloAsync(TrainingApplication trainingApplication)
        {
            var personId = trainingApplication.User.SoloPersonId ?? Guid.Empty;
            await impersonateAndSetProfile(personId);
            var createCommand = await _context.Documents.GetBlank(WellKnown.TrainingRequest.DocumentTypeId);
            var documentId = Guid.NewGuid();
            createCommand.DocumentId = documentId;

            //Заполняем кастомные поля документа
            fillTrainingRequestFields(createCommand, trainingApplication);

            var sendCommand = new SendToApprovementDemandCommandApiDTO
            {
                CreateCommand = createCommand,
                DocumentId = createCommand.DocumentId,
                ProfileId = createCommand.ProfileId
            };
            await _context.Documents.ExecuteCommand(sendCommand);
            return documentId;
        }

        public List<DocumentApiDTO> GetApplications(Guid userId)
        {
            throw new NotImplementedException();
        }

        public string GetApplicationStatus(Guid DocumentId)
        {
            throw new NotImplementedException();
        }

        private void fillTrainingRequestFields(CreateDemandCommandApiDTO createCommand, TrainingApplication trainingApplication)
        {
            var orgUnits = _org.OrgUnits.Where(x => x.Chief.Appointment != null).Take(2).ToList();

            createCommand.OuterApproversAppointmentsIds = trainingApplication.ApprovingManagers.Select(m => m.SoloAppointmentId).ToList();

            createCommand.CustomFields[WellKnown.TrainingRequest.TrainingGoal] = trainingApplication.TrainingGoals;
            createCommand.CustomFields[WellKnown.TrainingRequest.TrainingCourse] = new TrainingCourseApiDTO
            {
                Name = trainingApplication.Course.Name,
                Type = trainingApplication.Course.IsTrainingOnline ? "Онлайн курсы": "Очные курсы",
                Category = trainingApplication.Course.Category,
                Description = trainingApplication.Course.Description,
                TrainingCenter = trainingApplication.Course.TrainingCenter,
                Cost = trainingApplication.Course.TotalCost.ToString() + "руб.",
            };
            createCommand.CustomFields[WellKnown.TrainingRequest.Initiator] = trainingApplication.User.SoloPersonId;
            createCommand.CustomFields[WellKnown.TrainingRequest.Participants] = trainingApplication.ApplicationParticipants.Select(m => m.SoloPersonId).ToList();
            createCommand.CustomFields[WellKnown.TrainingRequest.Period] = new PeriodApiDTO
            {
                StartDate = trainingApplication.Course.Begin,
                FinishDate = trainingApplication.Course.End
            };
        }

        private async Task impersonateAndSetProfile(Guid personId)
        {
            _context.Impersonate(personId);

            var profiles = await _context.Profiles.GetProfiles();
            _context.SetProfile(profiles.First(x => x.Type == ProfileType.Personal));
        }
    }
}
