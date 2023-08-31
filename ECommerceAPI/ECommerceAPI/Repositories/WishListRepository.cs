using ECommerceAPI.Data;

namespace ECommerceAPI.Repositories
{
	public class WishListRepository : IWishList
	{
		private readonly EshoppingZoneContext _wishListContext;

		public WishListRepository(EshoppingZoneContext wishListContext)
		{
			_wishListContext = wishListContext;
		}
		public WishList AddToWishList(WishList wishList)
		{
			try
			{
				_wishListContext.WishLists.Add(wishList);
				_wishListContext.SaveChanges();
				return wishList;
			}
			catch
			{
				throw new Exception("Could not add!");
			}
		}

		public bool DeleteFromWishList(WishList wishList)
		{
			try
			{
				var item = _wishListContext.WishLists.Where(x => x.UserId == wishList.UserId && x.ProductId == wishList.ProductId).FirstOrDefault();
				if(item == null)
				{
					return false;
				}
				_wishListContext.WishLists.Remove(item);
				_wishListContext.SaveChanges();
				return true;
			}
			catch
			{
				return false;
			}
		}

		public List<WishList> GetWishListItemsByUserId(int userId)
		{
			var items = _wishListContext.WishLists.Where(x => x.UserId == userId).ToList();
			if(items == null)
			{
				return null;
			}
			return items;
		}
	}
}
