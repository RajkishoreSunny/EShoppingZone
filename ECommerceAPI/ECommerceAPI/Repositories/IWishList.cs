namespace ECommerceAPI.Repositories
{
	public interface IWishList
	{
		public List<WishList> GetWishListItemsByUserId(int userId);
		public WishList AddToWishList(WishList wishList);
		public bool DeleteFromWishList(WishList wishList);
	}
}
