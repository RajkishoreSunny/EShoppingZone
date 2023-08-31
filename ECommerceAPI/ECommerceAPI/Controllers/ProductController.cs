using ECommerceAPI.Data;
using ECommerceAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[EnableCors("AllowOrigin")]
	public class ProductController : ControllerBase
	{
		private readonly ProductService _pservice;

		public ProductController(ProductService pservice)
		{
			_pservice = pservice;
		}

		[HttpGet("GetAllProducts")]
		[EnableCors("AllowOrigin")]
		public ActionResult<List<Product>> GetAllProducts()
		{
			var products = _pservice.GetAllProducts();
			return Ok(products);
		}

		[HttpGet("GetProductById/{Id}")]
		[EnableCors("AllowOrigin")]
		public ActionResult<Product> GetProductById(int Id)
		{
			var product = _pservice.GetProductById(Id);
			if (product == null)
			{
				return NotFound("Requested Product doesn't exist!!");
			}
			return Ok(product);
		}

		[HttpGet("GetProductByName")]
		[EnableCors("AllowOrigin")]
		public ActionResult<List<Product>> GetProductByName(string name) 
		{
			var foundProduct = _pservice.GetProductByName(name);
			if(foundProduct == null) 
			{
				return Ok(new List<Product>());
			}
			return Ok(foundProduct);
		}

		[HttpPost("AddProduct")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public ActionResult<Product> AddProduct([FromBody] Product product)
		{
			try
			{
				var addProduct = _pservice.AddProduct(product);
				return Ok(addProduct);
			}
			catch
			{
				return StatusCode(400, "Could Not Add!!");
			}

		}
		[HttpPost("UploadProductImage")]
		[EnableCors("AllowOrigin")]
		public IActionResult UploadProductImage(IFormFile file, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			var img = _pservice.UploadProductImage(file, dbContext, id);
			if (img == true)
			{
				return Ok(id);
			}
			return BadRequest("Could not Add");
		}

		[HttpPut("UpdateProduct/{Id}")]
		[EnableCors("AllowOrigin")]
		public ActionResult<List<Product>> UpdateProduct(int Id, [FromBody] Product product)
		{
			var updateProduct = _pservice.UpdateProduct(Id, product);
			if (updateProduct == null)
			{
				return NotFound("The requested admin doesn't exist!!");
			}
			return Ok(updateProduct);
		}

		[HttpDelete("DeleteProduct/{Id}")]
		[EnableCors("AllowOrigin")]
		public ActionResult<List<Product>> DeleteProduct(int Id)
		{
			var deleteProduct = _pservice.DeleteProduct(Id);
			if (deleteProduct == null)
			{
				return NotFound("Admin doesn't exist!!");
			}
			return Ok(deleteProduct);
		}

		[HttpGet("GetProductsByCategory/category/{categoryId}/products")]
		[EnableCors("AllowOrigin")]
		public ActionResult<IEnumerable<Product>> GetProductsByCategory(int categoryId)
		{
			var products = _pservice.GetProductsByCategory(categoryId);
			if(products == null)
			{
				return NotFound("Not Found");
			}
			return Ok(products);
		}
	}
}
