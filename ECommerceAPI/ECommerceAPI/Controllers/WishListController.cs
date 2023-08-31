using ECommerceAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WishListController : ControllerBase
	{
		private readonly WishListService _wishListService;

		public WishListController(WishListService wishListService)
		{
			_wishListService = wishListService;
		}

		[HttpGet("GetAllWishListItems")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public ActionResult<List<WishList>> GetWishListItemsByUserId(int userId)
		{
			try
			{
				var items = _wishListService.GetWishListItemsByUserId(userId);
				return items;
			}
			catch
			{
				return NotFound("Could Not Load!");
			}
		}

		[HttpPost("AddToWishList")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public ActionResult<WishList> AddToWishList([FromBody] WishList wishList)
		{
			var addItem = _wishListService.AddToWishList(wishList);
			if(addItem != null)
			{
				return Ok(addItem);
			}
			return BadRequest("Could Not Add!");
		}

		[HttpDelete("DeleteFromWishList")]
		[EnableCors("AllowOrigin")]
		[Authorize]
		public ActionResult DeleteFromWishList(WishList wishList)
		{
			var deleteItem = _wishListService.DeleteFromWishList(wishList);
			if(deleteItem == true)
			{
				return Ok("Deleted");
			}
			return BadRequest("Could not Delete!");
		}
	}
}
