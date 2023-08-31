using ECommerceAPI.Repositories;

namespace ECommerceAPI.Services
{
	public class CartService
	{
		private readonly ICartRepository _cartRepository;

		public CartService(ICartRepository cartRepository)
		{
			_cartRepository = cartRepository;
		}
		public List<Cart> AddItem(Cart cart)
		{
			return _cartRepository.AddItem(cart);
		}

		public List<Cart> DeleteItemsFromCart(Cart cart)
		{
			return _cartRepository.DeleteItemsFromCart(cart);
		}

		public List<Cart> GetAllItemsFromCart()
		{
			return _cartRepository.GetAllItemsFromCart();
		}

		public Cart GetItemById(int id)
		{
			return _cartRepository.GetItemById(id);
		}

		public List<Cart> GetItemsByUserId(int userId) 
		{
			return _cartRepository.GetItemsByUserId(userId);
		}

		public List<Cart> UpdateCart(int id, Cart cart)
		{
			return _cartRepository.UpdateCart(id, cart);
		}

		public Cart UpdateQuantity(Cart cart) 
		{
			return _cartRepository.UpdateQuantity(cart);
		}

		public void ClearCart(int id)
		{
			_cartRepository.ClearCart(id);
		}
	}
}
