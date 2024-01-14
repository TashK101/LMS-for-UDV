using external_training.Controllers.DtoModels;
using external_training.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace external_training.Controllers
{
    [Route("api/manager")]
    [ApiController]
    [Authorize(Roles = "Admin,Manager")]
    public class ManagerController : ControllerBase
    {
        private readonly IManagerApplicationService _managerApplicationService;

        public ManagerController(IManagerApplicationService managerApplicationService)
        {
            _managerApplicationService = managerApplicationService;
        }

        [HttpGet("pending_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetPendingApplications()
        {
            var id = User.Identity.Name;
            var applications = _managerApplicationService.GetPendingApplications(id);
            return Ok(applications);
        }

        [HttpPost("decline_application")]
        public async Task<ActionResult> DeclineApplication(int TrainingApplicationId)
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpPost("accept_application")]
        public async Task<ActionResult> AcceptApplication(int TrainingApplicationId)
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpGet("archived_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetArchivedApplications()
        {
            await Task.Yield();
            throw new NotImplementedException();
        }
    }
}
