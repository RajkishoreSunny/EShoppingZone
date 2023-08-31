namespace ECommerceAPI.Repositories
{
	public interface IFeedback
	{
		public List<Feedback> GetFeedbacks();
		public Feedback AddFeedback(Feedback feedback);
	}
}
