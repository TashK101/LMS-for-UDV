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

        [HttpPost("edit_course")]
        public async Task<StatusCodeResult> EditCourse(CourseDto courseDto)
        {
            await _adminApplicationService.EditCourse(courseDto);
            return Ok();
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

        [HttpGet("archived_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetArchivedApplications()
        {
            var applications = await _adminApplicationService.GetArchivedApplicationsAsync();
            return Ok(applications);
        }
    }
}
