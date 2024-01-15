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
            var applications = await _managerApplicationService.GetPendingApplicationsAsync(id);
            return Ok(applications);
        }

        [HttpPost("decline_application")]
        public async Task<ActionResult> DeclineApplication(int TrainingApplicationId)
        {
            var IsSuccess = await _managerApplicationService.DeclineApplicationAsync(TrainingApplicationId);
            if (IsSuccess)
                return Ok();
            return NotFound();
        }

        [HttpPost("accept_application")]
        public async Task<ActionResult> AcceptApplication(int TrainingApplicationId)
        {
            var IsSuccess = await _managerApplicationService.AcceptApplicationAsync(TrainingApplicationId);
            if (IsSuccess)
                return Ok();
            return NotFound();
        }

        [HttpGet("archived_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetArchivedApplications()
        {
            var id = User.Identity.Name;
            var applications = await _managerApplicationService.GetArchivedApplicationsAsync(id);
            return Ok(applications);
        }

        [HttpPost("comment")]
        public async Task<ActionResult> CreateComment(CommentCreation commentCreation)
        {
            await _managerApplicationService.CreateCommentAsync(commentCreation, User!.Identity!.Name!);
            return Ok();
        }

        [HttpGet("comments")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments(int trainingApplicationId)
        {
            var comments = await _managerApplicationService.GetComments(trainingApplicationId);
            return Ok(comments);
        }
    }
}
