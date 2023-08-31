using ECommerceAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly OrderService _oservice;

		public OrderController(OrderService oservice)
		{
			_oservice = oservice;
		}
		[HttpPost("AddOrder")]
		[EnableCors("AllowOrigin")]
		public IActionResult AddOrder([FromBody] Order order)
		{
			var or = _oservice.AddOrder(order);
			if(or != null)
			{
				return Ok(or);
			}
			return BadRequest();
		}
	}
}
