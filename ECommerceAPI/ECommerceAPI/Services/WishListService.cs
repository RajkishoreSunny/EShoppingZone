using ECommerceAPI.Repositories;

namespace ECommerceAPI.Services
{
	public class WishListService
	{
		private readonly IWishList _wishList;

		public WishListService(IWishList wishList)
		{
			_wishList = wishList;
		}
		public WishList AddToWishList(WishList wishList)
		{
			return _wishList.AddToWishList(wishList);
		}
		public bool DeleteFromWishList(WishList wishList)
		{
			return _wishList.DeleteFromWishList(wishList);
		}
		public List<WishList> GetWishListItemsByUserId(int userId)
		{
			return _wishList.GetWishListItemsByUserId(userId);
		}
	}
}
