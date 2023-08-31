using ECommerceAPI.Data;
using ECommerceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Services
{
	public class ProductService
	{
		private readonly IProductRepository _productRepo;

		public ProductService(IProductRepository productRepo)
		{
			_productRepo = productRepo;
		}

		public Product AddProduct(Product product)
		{
			return _productRepo.AddProduct(product);
		}
		public bool UploadProductImage(IFormFile file, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			return _productRepo.UploadProductImage(file, dbContext, id);
		}
		public List<Product> GetAllProducts()
		{
			return _productRepo.GetAllProducts();
		}
		public Product GetProductById(int id)
		{
			return _productRepo.GetProductById(id);
		}
		public List<Product> GetProductByName(string name) 
		{
			return _productRepo.GetProductByName(name);
		}
		public Product UpdateProduct(int id, Product product)
		{
			return _productRepo.UpdateProduct(id, product);
		}
		public List<Product> DeleteProduct(int id)
		{
			return _productRepo.DeleteProduct(id);
		}
		public IEnumerable<Product> GetProductsByCategory(int categoryId)
		{
			return _productRepo.GetProductsByCategory(categoryId);
		}
	}
}
