using ECommerceAPI.Data;
using ECommerceAPI.Models;
using ECommerceAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Services
{
	public class UserService
	{
		private readonly IUser _user;

		public UserService(IUser user)
		{
			_user = user;
		}

		public User AddUser(User user)
		{
			return _user.AddUser(user);
		}

		public string DeleteUser(int id)
		{
			return _user.DeleteUser(id);
		}

		public List<User> GetAllUsers()
		{
			return _user.GetAllUsers();
		}

		public User GetUserByEmail(string email, string Password)
		{
			return _user.GetUserByEmail(email, Password);
		}

		public User GetByEmail(string email)
		{
			return _user.GetByEmail(email);
		}

		public User GetUserById(int id)
		{
			return _user.GetUserById(id);
		}

		public User UpdateUser(int id, User user)
		{
			return _user.UpdateUser(id, user);
		}

		public bool ChangePassword(string email, string newPassword)
		{
			return _user.ChangePassword(email, newPassword);
		}
		public bool UploadImage(IFormFile formFile, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			return _user.UploadImage(formFile, dbContext, id);
		}
	}
}
