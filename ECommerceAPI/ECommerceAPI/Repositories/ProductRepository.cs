using ECommerceAPI.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Repositories
{

	public class ProductRepository : IProductRepository
	{
		private readonly EshoppingZoneContext _productContext;

		public ProductRepository(EshoppingZoneContext productContext)
		{
			_productContext = productContext;
		}
		public Product AddProduct(Product product)
		{
			try
			{
				product.Category = null;
				_productContext.Products.Add(product);
				_productContext.SaveChanges();
				return product;
			}
			catch
			{
				throw new Exception("Could not Add!!");
			}
		}
		public bool UploadProductImage(IFormFile file, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			if (file == null || file.Length == 0)
				return false;

			byte[] imageData;
			using (var memoryStream = new MemoryStream())
			{
				file.CopyTo(memoryStream);
				imageData = memoryStream.ToArray();
			}

			var category = dbContext.Products.FirstOrDefault(c => c.ProductId == id);
			if (category == null)
				return false;

			category.Image = imageData;
			dbContext.SaveChanges();

			return true;
		}

		public List<Product> DeleteProduct(int id)
		{
			var deleteProduct = _productContext.Products.FirstOrDefault(x => x.ProductId == id);
			if (deleteProduct == null)
			{
				return null;
			}
			_productContext.Remove(deleteProduct);
			_productContext.SaveChanges();
			return _productContext.Products.ToList();
		}

		public List<Product> GetAllProducts()
		{
			return _productContext.Products.ToList();
		}

		public Product GetProductById(int id)
		{
			var product = _productContext.Products.Find(id);
			try
			{
				return product;
			}
			catch
			{
				throw new Exception("Not Found!!");
			}
		}

		public List<Product> GetProductByName(string name)
		{
			if (string.IsNullOrEmpty(name) || name.Length < 1)
			{
				// Invalid search term, return an empty list or an appropriate response
				return null;
			}
			var foundProducts = _productContext.Products
				.Where(p => p.ProductName.Contains(name))
				.ToList();

			return foundProducts;
		}

		public Product UpdateProduct(int id, Product product)
		{
			var updateProduct = _productContext.Products.FirstOrDefault(x => x.ProductId == id);
			if (updateProduct == null)
			{
				return null;
			}
			try
			{
				updateProduct.CategoryId = product.CategoryId;
				updateProduct.Image = product.Image;
				updateProduct.ProductName = product.ProductName;
				updateProduct.ProductPrice = product.ProductPrice;
				updateProduct.Description = product.Description;
				updateProduct.Rating = product.Rating;
				updateProduct.ReviewId = product.ReviewId;
				_productContext.SaveChanges();
				return updateProduct;
			}
			catch
			{
				throw new Exception("Product Not Updated!!");
			}
		}

		public IEnumerable<Product> GetProductsByCategory(int categoryId)
		{
			var products = _productContext.Products
				.Where(p => p.CategoryId == categoryId)
				.ToList();

			return products;
		}
	}
}
