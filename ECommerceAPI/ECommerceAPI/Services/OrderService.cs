using ECommerceAPI.Repositories;

namespace ECommerceAPI.Services
{
	public class OrderService
	{
		private readonly IOrderRepository _orderRepo;

		public OrderService(IOrderRepository orderRepo)
		{
			_orderRepo = orderRepo;
		}
		public Order AddOrder(Order order)
		{
			return _orderRepo.AddOrder(order);
		}
	}
}
