using ECommerceAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Repositories
{
	public interface IProductRepository
	{
		public List<Product> GetAllProducts();
		public Product GetProductById(int id);
		public Product UpdateProduct(int id, Product product);
		public Product AddProduct(Product product);
		public bool UploadProductImage(IFormFile file, [FromServices] EshoppingZoneContext dbContext, int id);
		public List<Product> DeleteProduct(int id);
		public List<Product> GetProductByName(string name);
		public IEnumerable<Product> GetProductsByCategory(int categoryId);
	}
}
