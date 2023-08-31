using ECommerceAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Repositories
{
	public class OrderRepository : IOrderRepository
	{
		private readonly EshoppingZoneContext _order;

		public OrderRepository(EshoppingZoneContext order)
		{
			_order = order;
		}
		public Order AddOrder([FromBody] Order order)
		{
			try
			{
				_order.Orders.Add(order);
				_order.SaveChanges();
				return order;
			}
			catch
			{
				return null;
			}
		}

		public List<Order> DeleteOrder(int id)
		{
			throw new NotImplementedException();
		}

		public List<Order> GetAllOrders()
		{
			throw new NotImplementedException();
		}

		public Order GetOrderById(int id)
		{
			throw new NotImplementedException();
		}

		public List<Order> UpdateOrder(int id, Order order)
		{
			throw new NotImplementedException();
		}
	}
}
