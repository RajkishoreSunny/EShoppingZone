using ECommerceAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FeedbackController : ControllerBase
	{
		private readonly FeedbackService _fservice;

		public FeedbackController(FeedbackService fservice)
		{
			_fservice = fservice;
		}
		[HttpGet("GetFeedbacks")]
		[EnableCors("AllowOrigin")]
		public ActionResult<List<Feedback>> GetFeedbacks()
		{
			var feedbacks = _fservice.GetFeedbacks();
			if(feedbacks != null)
			{
				return Ok(feedbacks);
			}
			return NotFound();
		}

		[HttpPost("AddFeedback")]
		[EnableCors("AllowOrigin")]
		public IActionResult AddFeedback(Feedback feedback)
		{
			try
			{
				var add = _fservice.AddFeedback(feedback);
				if(add != null)
				{
					return Ok(add);
				}
				return BadRequest();
			}
			catch
			{
				return BadRequest("Could Not Add");
			}
		}
	}
}
