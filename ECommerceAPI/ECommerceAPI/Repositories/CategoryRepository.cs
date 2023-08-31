using ECommerceAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Repositories
{
	public class CategoryRepository : ICategory
	{
		private readonly EshoppingZoneContext _categoryContext;

		public CategoryRepository(EshoppingZoneContext categoryContext)
		{
			_categoryContext = categoryContext;
		}
		public List<Category> GetAllCategories()
		{
			var categories = _categoryContext.Categories.ToList();
			return categories;
		}

		public Category AddCategory(Category category) 
		{
			try
			{
				_categoryContext.Categories.Add(category);
				_categoryContext.SaveChanges();
				return category;
			}
			catch
			{
				throw new Exception("Couldn't add");
			}
		}
		public bool UploadImage(IFormFile file, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			if (file == null || file.Length == 0)
				return false;

			byte[] imageData;
			using (var memoryStream = new MemoryStream())
			{
				file.CopyTo(memoryStream);
				imageData = memoryStream.ToArray();
			}

			var category = dbContext.Categories.FirstOrDefault(c => c.CategoryId == id);
			if (category == null)
				return false;

			category.CategoryImg = imageData;
			dbContext.SaveChanges();

			return true;
		}
	}
}
