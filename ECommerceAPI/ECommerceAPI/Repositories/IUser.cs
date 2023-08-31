using ECommerceAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Repositories
{
	public interface IUser
	{
		public List<User> GetAllUsers();
		public User GetUserById(int id);
		public User GetUserByEmail(string email, string Password);
		public User GetByEmail(string email);
		public User AddUser(User user);
		public User UpdateUser(int id, User user);
		public string DeleteUser(int id);
		public bool ChangePassword(string email, string newPassword);
		public bool UploadImage(IFormFile formFile, [FromServices] EshoppingZoneContext dbContext, int id);

	}
}
