using ECommerceAPI.Repositories;

namespace ECommerceAPI.Services
{
	public class FeedbackService
	{
		private readonly IFeedback _feedback;

		public FeedbackService(IFeedback feedback)
		{
			_feedback = feedback;
		}
		public Feedback AddFeedback(Feedback feedback)
		{
			return _feedback.AddFeedback(feedback);
		}

		public List<Feedback> GetFeedbacks()
		{
			return _feedback.GetFeedbacks();
		}
	}
}
