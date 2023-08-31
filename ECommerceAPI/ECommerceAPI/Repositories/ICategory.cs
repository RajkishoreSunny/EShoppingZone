using ECommerceAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Repositories
{
	public interface ICategory
	{
		public List<Category> GetAllCategories();
		public Category AddCategory(Category category);

		public bool UploadImage(IFormFile file, [FromServices] EshoppingZoneContext dbContext, int id);
	}
}
