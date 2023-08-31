using ECommerceAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Repositories
{
	public class ReviewRepository: IReview
	{
		private readonly EshoppingZoneContext _reviewRepo;

		public ReviewRepository(EshoppingZoneContext reviewRepo) 
		{
			_reviewRepo = reviewRepo;
		}

		public Review AddReview(Review review)
		{
			try
			{

				_reviewRepo.Reviews.Add(review);
				_reviewRepo.SaveChanges();
				return review;
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex);
				return null;
			}
		}

		public Review FetchLastRecord()
		{
			var lastUsr = _reviewRepo.Reviews.OrderByDescending(l => l.ReviewId).FirstOrDefault();
			if(lastUsr == null)
			{
				return null;
			}
			return lastUsr;
		}

		public List<Review> GetAllReviews(int productId)
		{
			var reviews = _reviewRepo.Reviews.Where(x => x.ProductId == productId);
			return reviews.ToList();
		}

		public Review UpdateReview(Review review)
		{
			var rev = _reviewRepo.Reviews.Where(x => x.ProductId == review.ProductId && x.Description == review.Description).FirstOrDefault();
			if (rev != null)
			{
				rev.Description = review.Description;
				rev.Rating = review.Rating;
				_reviewRepo.SaveChanges();
				return rev;
			}
			return null;
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

			var reviewImg = dbContext.Reviews.FirstOrDefault(r => r.ProductId == id);
			if (reviewImg == null)
				return false;

			reviewImg.Image = imageData;
			dbContext.SaveChanges();

			return true;
		}

	}
}
