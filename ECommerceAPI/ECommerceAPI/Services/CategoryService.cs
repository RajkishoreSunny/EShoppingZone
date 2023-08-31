using ECommerceAPI.Data;
using ECommerceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Services
{
	public class CategoryService
	{
		private readonly ICategory _categoryService;

		public CategoryService(ICategory categoryService) 
		{
			_categoryService = categoryService;
		}

		public List<Category> GetAllCategories() 
		{
			return _categoryService.GetAllCategories();
		}

		public Category AddCategory(Category category) 
		{
			return _categoryService.AddCategory(category);
		}

		public bool UploadImage(IFormFile file, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			return _categoryService.UploadImage(file, dbContext, id);
		}
	}
}
