using ECommerceAPI.Data;

namespace ECommerceAPI.Repositories
{
	public class FeedbackRepository : IFeedback
	{
		private readonly EshoppingZoneContext _fcontext;

		public FeedbackRepository(EshoppingZoneContext fcontext)
		{
			_fcontext = fcontext;
		}
		public Feedback AddFeedback(Feedback feedback)
		{
			try
			{
				_fcontext.Feedbacks.Add(feedback);
				_fcontext.SaveChanges();
				return feedback;
			}
			catch
			{
				return null;
			}
		}

		public List<Feedback> GetFeedbacks()
		{
			var feedbacks = _fcontext.Feedbacks.ToList();
			return feedbacks;
		}
	}
}
