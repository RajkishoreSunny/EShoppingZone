namespace ECommerceAPI.Repositories
{
	public interface ICartRepository
	{
		public List<Cart> GetAllItemsFromCart();
		public Cart GetItemById(int id);
		public List<Cart> GetItemsByUserId(int userId);
		public List<Cart> UpdateCart(int id, Cart cart);
		public Cart UpdateQuantity(Cart cart);
		public List<Cart> DeleteItemsFromCart(Cart cart);
		public List<Cart> AddItem(Cart cart);
		public void ClearCart(int id);
	}
}
