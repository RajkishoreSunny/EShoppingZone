using ECommerceAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Repositories
{
	public interface IReview
	{
		public List<Review> GetAllReviews(int productId);
		public Review AddReview(Review review);
		public Review UpdateReview(Review review);
		public bool UploadImage(IFormFile formFile, [FromServices] EshoppingZoneContext dbContext, int id);
		public Review FetchLastRecord();
	}
}

