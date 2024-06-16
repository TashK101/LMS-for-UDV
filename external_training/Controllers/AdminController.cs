using external_training.Controllers.DtoModels;
using external_training.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace external_training.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminApplicationService _adminApplicationService;

        public AdminController(IAdminApplicationService adminApplicationService)
        {
            _adminApplicationService = adminApplicationService;
        }

        [HttpGet("pending_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetPendingApplications()
        {
            var applications = await _adminApplicationService.GetPendingApplicationsAsync();
            return Ok(applications);
        }

        [HttpPost("edit_desired_course")]
        public async Task<StatusCodeResult> EditDesiredCourse(CourseDto courseDto)
        {
            await _adminApplicationService.EditDesiredCourse(courseDto);
            return Ok();
        }

        [HttpPost("edit_selected_course")]
        public async Task<StatusCodeResult> EditSelectedCourse(CourseDto courseDto)
        {
            await _adminApplicationService.EditCourse(courseDto);
            return Ok();
        }

        [HttpPost("replace_participants")]
        public async Task<StatusCodeResult> ReplaceParticipants(ReplaceParticipantsDto replace)
        {
            await _adminApplicationService.ReplaceParticipantsAsync(replace);
            return Ok();
        }

        [HttpPost("replace_managers")]
        public async Task<StatusCodeResult> ReplaceManagers(ReplaceManagersDto replace)
        {
            await _adminApplicationService.ReplaceManagersAsync(replace);
            return Ok();
        }

        [HttpPost("send_application_to_solo")]
        public async Task<StatusCodeResult> SendApplicationToSolo(int applicationId)
        {
            var isChanged = await _adminApplicationService.SendApplicationToSolo(applicationId);
            if (isChanged)
                return Ok();
            return BadRequest();
        }

        [HttpPost("change_status")]
        public async Task<StatusCodeResult> ChangeStatus(int applicationId, string status)
        {
            var isChanged = await _adminApplicationService.ChangeStatusAsync(applicationId, status);
            if (isChanged)
                return Ok();
            return BadRequest();
        }

        [HttpPost("comment")]
        public async Task<ActionResult> CreateComment(CommentCreation commentCreation)
        {
            await _adminApplicationService.CreateCommentAsync(commentCreation, User!.Identity!.Name!);
            return Ok();
        }

        [HttpGet("user_managers")]
        public async Task<ActionResult<IEnumerable<SoloManagerDto>>> GetUserManagers(string userId)
        {
            var managers = await _adminApplicationService.GetManagersAsync(userId);
            return Ok(managers);
        }

        [HttpGet("archived_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetArchivedApplications()
        {
            var applications = await _adminApplicationService.GetArchivedApplicationsAsync();
            return Ok(applications);
        }
    }
}
