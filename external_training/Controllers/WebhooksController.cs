using external_training.Controllers.DtoModels;
using external_training.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace ExternalTraining.Controllers
{
    [Route("api/webhooks")]
    [ApiController]
    public class WebhooksController : ControllerBase
    {
        private readonly IWebhooksService _webhooksService;
        private readonly ILogger<WebhooksController> _logger;

        public WebhooksController(IWebhooksService webhooksService, ILogger<WebhooksController> logger)
        {
            _webhooksService = webhooksService;
            _logger = logger;
        }

        [HttpPost("request_status")]
        public async Task<StatusCodeResult> ReceiveRequestStatus(ApplicationStateDto state)
        {
            await _webhooksService.changeApprovalState(state);
            return Ok();
        }
    }
}