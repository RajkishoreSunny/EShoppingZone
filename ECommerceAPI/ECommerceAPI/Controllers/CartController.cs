using ECommerceAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ECommerceAPI.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CartController : ControllerBase
	{
		private readonly CartService _cartService;

		public CartController(CartService cartService) 
		{
			_cartService = cartService;
		}
		[HttpPost("AddToCart")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public ActionResult AddItem([FromBody] Cart cart)
		{
			var addItem = _cartService.AddItem(cart);
			if(addItem != null) 
			{
				return Ok(addItem);
			}
			return StatusCode(400, "Could Not Add!!");
		}

		[HttpGet]
		public ActionResult<List<Cart> > GetItemsFromCart()
		{
			return _cartService.GetAllItemsFromCart().ToList();
		}

		[HttpGet]
		[Route("GetItemById/{id}")]
		public ActionResult<Cart> GetItemById(int id) 
		{
			var item = _cartService.GetItemById(id);
			if(item != null)
			{
				return Ok(item);
			}
			return BadRequest("Item Not Found!!");
		}
		[HttpGet("GetItemsByUserId")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public ActionResult<List<Cart> > GetItemsByUserId(int userId)
		{
			var cartItems = _cartService.GetItemsByUserId(userId);
			if(cartItems != null)
			{
				return Ok(cartItems);
			}
			return new List<Cart>();
		}

		[HttpPut]
		[Route("UpdateCart/{id}")]
		public ActionResult<List<Cart> > UpdateCart(int id, [FromBody] Cart cart)
		{
			var updateCart = _cartService.UpdateCart(id, cart);
			if(updateCart!= null) 
			{
				return Ok(updateCart);
			}
			return NotFound("Item Missing!!");
		}

		[HttpPut("UpdateQuantity")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public ActionResult<Cart> UpdateQuantity([FromBody] Cart cart)
		{
			var item = _cartService.UpdateQuantity(cart);
			if(item != null)
			{
				return Ok(item);
			}
			return NotFound("Selected Product Doesn't Exist!");
		}

		[HttpDelete("DeleteFromCart")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public ActionResult DeleteItem(Cart cart) 
		{
			var deleteFromCart = _cartService.DeleteItemsFromCart(cart);
			if(deleteFromCart != null) 
			{
				return Ok(deleteFromCart);
			}
			return BadRequest("Item Doesn't Exist!!");
		}

		[HttpPost("ClearCart")]
		[EnableCors("AllowOrigin")]
		public IActionResult ClearCart(int userId)
		{
			try
			{
				_cartService.ClearCart(userId);
				return Ok();
			}
			catch
			{
				return BadRequest();
			}
		}
	}
}
