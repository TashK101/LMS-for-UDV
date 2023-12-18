using external_training.Controllers.DtoModels;
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
        [HttpGet("pending_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetPendingApplications()
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpPost("course")]
        public async Task<StatusCodeResult> AddCourse(SelectedCourseRequest applicationRequest)
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
