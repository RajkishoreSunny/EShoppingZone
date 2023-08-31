using ECommerceAPI.Data;
using ECommerceAPI.Models;
using ECommerceAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[EnableCors("AllowOrigin")]
	public class CategoryController : ControllerBase
	{
		private readonly CategoryService _cservice;

		public CategoryController(CategoryService cservice)
		{
			_cservice = cservice;
		}

		[HttpGet("GetAllCategories")]
		[EnableCors("AllowOrigin")]
		public IActionResult GetAllCategories()
		{
			var result = _cservice.GetAllCategories();
			return Ok(result);
		}

		[HttpPost("AddCategory")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public IActionResult AddCategory(Category category) 
		{
			var addedCategory = _cservice.AddCategory(category);
			if (category.CategoryImg == null)
			{
				category.CategoryImg = null;
			}
			if(addedCategory != null)
			{
				return Ok(addedCategory);
			}
			else
			{
				return BadRequest("Could Not Add");
			}
		}

		[HttpPost("uploadImage")]
		[EnableCors("AllowOrigin")]
		public IActionResult UploadImage(IFormFile file, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			var img = _cservice.UploadImage(file, dbContext, id);
			if(img == true)
			{
				return Ok(id);
			}
			return BadRequest("Could not Add");
		}
	}
}
