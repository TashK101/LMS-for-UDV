using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace external_training.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    public class UserController : ControllerBase
    {
        private readonly IUserApplicationService _applicationService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserApplicationService applicationService, ILogger<UserController> logger, UserManager<ApplicationUser> userManager)
        {
            _applicationService = applicationService;
            _logger = logger;
            _userManager = userManager;
        }

        [HttpPost("training_application")]
        public async Task<StatusCodeResult> CreateTrainingApplication(TrainingApplicationRequest applicationRequest)
        {
            await _applicationService.CreateTrainingApplicationAsync(applicationRequest, User!.Identity!.Name!);
            return Ok();
        }

        [HttpPost("edit_desired_course")]
        public async Task<StatusCodeResult> EditDesiredCourse(CourseDto courseDto)
        {
            await _applicationService.EditDesiredCourse(courseDto);
            return Ok();
        }

        [HttpPost("replace_participants")]
        public async Task<StatusCodeResult> ReplaceParticipants(ReplaceParticipantsDto replace)
        {
            await _applicationService.ReplaceParticipantsAsync(replace);
            return Ok();
        }

        [HttpPost("replace_managers")]
        public async Task<StatusCodeResult> ReplaceManagers(ReplaceManagersDto replace)
        {
            await _applicationService.ReplaceManagersAsync(replace);
            return Ok();
        }

        [HttpGet("managers")]
        public async Task<ActionResult<IEnumerable<SoloManagerDto>>> GetManagers()
        {
            var managers = await _applicationService.GetManagersAsync(User!.Identity!.Name!);
            return Ok(managers);
        }

        [HttpGet("all_solo_Employees")]
        public ActionResult<IEnumerable<PersonInfo>> GetAllSoloEmployees()
        {
            var employees = _applicationService.GetAllSoloEmployees();
            return Ok(employees);
        }

        [HttpGet("training_application")]
        public async Task<ActionResult<DetaileTrainingApplicationResponse>> GetTrainingApplication(int trainingApplicationId)
        {
            var application = await _applicationService.GetTrainingApplicationAsync(trainingApplicationId);
            if (application == null)
            {
                return NotFound();
            }
            return Ok(application);
        }

        [HttpGet("training_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetTrainingApplications()
        {
            var applications = await _applicationService.GetTrainingApplicationsAsync(User!.Identity!.Name!);
            return Ok(applications);
        }

        [HttpGet("archived_applications")]
        public async Task<ActionResult<IEnumerable<ShortTrainingApplicationResponse>>> GetArchivedApplications()
        {
            var archivedApplications = await _applicationService.GetArchivedApplicationsAsync(User!.Identity!.Name!);
            return Ok(archivedApplications);
        }

        [HttpGet("course")]
        public async Task<ActionResult<SelectedCourseResponse>> GetCourseResponse(int trainingApplicationId)
        {
            var course = await _applicationService.GetCourseAsync(trainingApplicationId);
            if (course == null)
                return NotFound();
            return Ok(course);
        }

        [HttpGet("completed_courses")]
        public async Task<ActionResult<IEnumerable<SelectedCourseResponse>>> GetCompletedCourses()
        {
            var courses = await _applicationService.GetCompletedCoursesAsync();
            return Ok(courses);
        }

        [HttpPost("comment")] 
        public async Task<ActionResult> CreateComment(CommentCreation commentCreation)
        {
            await _applicationService.CreateCommentAsync(commentCreation, User!.Identity!.Name!);
            return Ok();
        }

        [HttpGet("comments")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments(int trainingApplicationId)
        {
            var comments = await _applicationService.GetComments(trainingApplicationId);
            return Ok(comments);
        }

        [HttpGet("notifications")]
        public async Task<ActionResult<IEnumerable<NotificationResponse>>> GetNotifications()
        {
            var notifications = await _applicationService.GetNotificationsAsync(User!.Identity!.Name!);
            return Ok(notifications);
        }

        [HttpGet("events")]
        public async Task<ActionResult<IEnumerable<EventResponse>>> GetEvents()
        {
            var events = await _applicationService.GetEventsAsync();
            return Ok(events);
        }

        [HttpGet("role")]
        public async Task<ActionResult<RoleResponse>> GetRole()
        {
            var id = User!.Identity!.Name!;
            var user = await _userManager.FindByIdAsync(id);
            var roles = await _userManager.GetRolesAsync(user!);
            var role = new RoleResponse
            {
                UserId = id,
                UserEmail = user!.Email!,
                UserFullName = user!.FullName,
                RoleName = roles.Order().First()
            };
            return Ok(role);
        }
    }
}
