using ECommerceAPI.Data;
using ECommerceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Services
{
	public class ReviewService
	{
		private readonly IReview _review;

		public ReviewService(IReview review)
		{
			_review = review;
		}
		public List<Review> GetAllReviews(int productId)
		{
			return _review.GetAllReviews(productId);
		}
		public Review AddReview( Review review)
		{
			return _review.AddReview(review);
		}
		public Review UpdateReview(Review review)
		{
			return _review.UpdateReview(review);
		}
		public bool UploadImage(IFormFile formFile, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			return _review.UploadImage(formFile, dbContext, id);
		}
		public Review FetchLastRecord()
		{
			return _review.FetchLastRecord();
		}
	}
}
