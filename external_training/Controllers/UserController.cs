﻿using external_training.Controllers.DtoModels;
using external_training.Models;
using external_training.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace external_training.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize(Roles = "Admin,User,Manager")]
    public class UserController : ControllerBase
    {
        private readonly IUserApplicationService _applicationService;
        private readonly ILogger<UserController> _loggre;

        public UserController(IUserApplicationService applicationService, ILogger<UserController> logger)
        {
            _applicationService = applicationService;
            _loggre = logger;
        }

        [HttpPost("training_application")]
        public async Task<StatusCodeResult> CreateTrainingApplication(TrainingApplicationRequest applicationRequest)
        {
            await _applicationService.CreateTrainingApplicationAsync(applicationRequest, User!.Identity!.Name!);
            return Ok();
        }

        [HttpGet("managers")]
        public async Task<ActionResult<IEnumerable<ManagerInfo>>> GetManagers()
        {
            var managers = _applicationService.GetManagersAsync();
            return Ok(managers);
        }

        [HttpGet("training_application")]
        [EnableCors("OurCorsPolicy")]
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
        public async Task<ActionResult<SelectedCourseResponse>> GetSelectedCourseResponse(int trainingApplicationId)
        {
            await Task.Yield();
            throw new NotImplementedException();
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

        [HttpGet("events")]
        public async Task<ActionResult<IEnumerable<EventResponse>>> GetEvents(EventRequest eventRequest)
        {
            await Task.Yield();
            throw new NotImplementedException();
        }
    }
}
