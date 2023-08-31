namespace ECommerceAPI.Repositories
{
	public interface IOrderRepository
	{
		public List<Order> GetAllOrders();
		public Order GetOrderById(int id);
		public Order AddOrder(Order order);
		public List<Order> UpdateOrder(int id, Order order);
		public List<Order> DeleteOrder(int id);
	}
}
