using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace external_training.Controllers
{
    [Route("api/manager")]
    [ApiController]
    [Authorize(Roles = "Manager"      )]
    public class ManagerController : ControllerBase
    {
    }
}
