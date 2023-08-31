using ECommerceAPI.Data;
using ECommerceAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReviewController : ControllerBase
	{
		private readonly ReviewService _rservice;

		public ReviewController(ReviewService rservice)
		{
			_rservice = rservice;
		}
		[HttpGet("GetAllReviews")]
		[EnableCors("AllowOrigin")]
		public ActionResult<List<Review>> GetAllReviews(int productId)
		{
			var reviews = _rservice.GetAllReviews(productId);
			if(reviews != null)
			{
				return Ok(reviews);
			}
			return NotFound("Not Found");
		}
		[HttpPost("AddReview")]
		[EnableCors("AllowOrigin")]
		public ActionResult AddReview([FromBody] Review review)
		{
			var reviewToAdd = _rservice.AddReview(review);
			if(reviewToAdd != null)
			{
				return Ok(reviewToAdd);
			}
			return BadRequest("Could Not Add");
		}
		[HttpPost("UploadImage")]
		[EnableCors("AllowOrigin")]
		public IActionResult UploadImage(IFormFile formFile, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			var img = _rservice.UploadImage(formFile, dbContext, id);
			if (img == true)
			{
				return Ok(id);
			}
			return BadRequest("Could not Add");
		}
		[HttpPut("UpdateReview")]
		[EnableCors("AllowOrigin")]
		public ActionResult<Review> UpdateReview(Review review)
		{
			var revUpdate = _rservice.UpdateReview(review);
			if(revUpdate != null)
			{
				return Ok("Updated");
			}
			return BadRequest("Couldn't Update");
		}

		[HttpGet("GetLastRecord")]
		[EnableCors("AllowOrigin")]
		public IActionResult FetchLastRecord()
		{
			try
			{
				var lastusr = _rservice.FetchLastRecord();
				if(lastusr != null)
				{
					return Ok(lastusr);
				}
				return BadRequest(404);
			}
			catch
			{
				return BadRequest(404);
			}
		}
	}
}
