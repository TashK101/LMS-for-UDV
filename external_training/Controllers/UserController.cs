using external_training.Controllers.DtoModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace external_training.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize(Roles = "Admin,User,Manager")]
    public class UserController : ControllerBase
    {
        [HttpPost("training_application")]
        public async Task<StatusCodeResult> CreateTrainingApplication(TrainingApplicationRequest applicationRequest)
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpGet("manager_names")]
        public async Task<ActionResult<IEnumerable<string>>> GetManagerNames()
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpGet("training_application")]
        public async Task<ActionResult<DetaileTrainingApplicationResponse>> GetTrainingApplication(int TrainingApplicationId)
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpGet("training_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetTrainingApplications()
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpGet("course")]
        public async Task<ActionResult<SelectedCourseResponse>> GetSelectedCourseResponse(int trainingApplicationId)
        {
            await Task.Yield();
            throw new NotImplementedException();
        }

        [HttpPost("comment")]
        public async Task<ActionResult> CreateComment(CommentCreation commentCreation)
        {
            await Task.Yield();
            throw new NotImplementedException();
        }
    }
}
