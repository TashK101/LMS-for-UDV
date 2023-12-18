using external_training.Controllers.DtoModels;
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
        [HttpGet("pending_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetPendingApplications()
        {
            await Task.Yield();
            throw new NotImplementedException();
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
