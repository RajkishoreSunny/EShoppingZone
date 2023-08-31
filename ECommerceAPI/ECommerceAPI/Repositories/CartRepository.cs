using ECommerceAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ECommerceAPI.Repositories
{
    public class CartRepository : ICartRepository
	{
		private readonly EshoppingZoneContext _cartRepoContext;

		public CartRepository(EshoppingZoneContext cartRepoContext)
		{
			_cartRepoContext = cartRepoContext;
		}
		public List<Cart> DeleteItemsFromCart(Cart cart)
		{
			var itemToDelete = _cartRepoContext.Carts.Where(x => x.UserId == cart.UserId && x.ProductId == cart.ProductId).FirstOrDefault();
			if (itemToDelete == null) 
			{
				return null;
			}
			_cartRepoContext.Carts.Remove(itemToDelete);
			_cartRepoContext.SaveChanges();
			return _cartRepoContext.Carts.ToList();
		}

		public List<Cart> GetAllItemsFromCart()
		{
			return _cartRepoContext.Carts.ToList();
		}

		public Cart GetItemById(int id)
		{
			var item = _cartRepoContext.Carts.Find(id);
			if(item == null) 
			{
				return null;
			}
			return item;
		}

		public List<Cart> GetItemsByUserId(int userId)
		{
			var cartItems = _cartRepoContext.Carts.Where(c => c.UserId == userId).ToList();
			if(cartItems != null)
			{
				return cartItems;
			}
			return new List<Cart>();
		}

		public List<Cart> UpdateCart(int id, Cart cart)
		{
			var itemToUpdate = _cartRepoContext.Carts.Where(x => x.CartId == id).FirstOrDefault();
			if(itemToUpdate == null) 
			{
				return null;
			}
			try
			{
				itemToUpdate.TotalPrice = cart.TotalPrice;
				itemToUpdate.Quantity = cart.Quantity;
				itemToUpdate.UserId = cart.UserId;
				itemToUpdate.ProductId = cart.ProductId;
				_cartRepoContext.SaveChanges();
				return _cartRepoContext.Carts.ToList();
			}
			catch
			{
				return null;
			}
		}
		public Cart UpdateQuantity(Cart cart)
		{
			var item = _cartRepoContext.Carts.Where(p => p.ProductId == cart.ProductId && p.UserId == cart.UserId).FirstOrDefault();
			if(item != null)
			{
				var product = _cartRepoContext.Products.Where(p => p.ProductId == cart.ProductId).FirstOrDefault();
				item.Quantity = cart.Quantity;
				item.TotalPrice = (decimal)(cart.Quantity * product.ProductPrice);
				_cartRepoContext.SaveChanges();
				return item;
			}
			return null;
		}
		public List<Cart> AddItem(Cart cart)
		{
			try
			{
				_cartRepoContext.Carts.Add(cart);
				_cartRepoContext.SaveChanges();
				return _cartRepoContext.Carts.ToList();
			}
			catch
			{
				return null;
			}
		}
		public void ClearCart(int id)
		{
			try
			{
				var cartItems = _cartRepoContext.Carts.Where(x => x.UserId == id);
				if (cartItems.Any())
				{
					_cartRepoContext.RemoveRange(cartItems);
					_cartRepoContext.SaveChanges();
				}
			}
			catch
			{
				throw new Exception("Not Found");
			}
		}
	}
}
