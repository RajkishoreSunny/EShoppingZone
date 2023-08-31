using ECommerceAPI.Data;
using ECommerceAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceAPI.Repositories
{
	public class UserRepository : IUser
	{
		private readonly EshoppingZoneContext _context;

		public UserRepository(EshoppingZoneContext context)
		{
			_context = context;
		}
		public User AddUser(User user)  //Adding User
		{
			try
			{
				if(_context.Users.Where(x => x.Email == user.Email).FirstOrDefault() != null)
				{
					return null;
				}
				user.ProfileImg = null;
				var reviewId = LastUser();
				user.ReviewId = reviewId.ReviewId + 1;
				_context.Users.Add(user);
				_context.SaveChanges();
				return user;
			}
			catch
			{
				throw new Exception("Could Not Add!!");
			}
		}
		private User LastUser()
		{
			var lastUser = _context.Users.OrderByDescending(u => u.UserId).FirstOrDefault();
			if (lastUser != null)
			{
				return lastUser;
			}
			return null;
		}
		public string DeleteUser(int id)   //Deleteing User by Id
		{
			var deleteUser = _context.Users.FirstOrDefault(x => x.UserId == id);
			if (deleteUser != null)
			{
				_context.Users.Remove(deleteUser);
				_context.SaveChanges();
				return "User Deleted";
			}
			return "User Not Found!!";
		}

		public List<User> GetAllUsers()   //Getting all user details
		{
			return _context.Users.ToList();
		}

		public User GetUserByEmail(string email, string Password)  //Getting user details by email
		{
			var user = _context.Users.FirstOrDefault(x => x.Email == email && x.Password == Password);
			if (user != null)
			{
				return user;
			}
			return null;
		}

		public User GetByEmail(string email)
		{
			var user = _context.Users.FirstOrDefault(x => x.Email == email);
			if(user != null)
			{
				return user;
			}
			return null;
		}

		public User GetUserById(int id)   //Getting user by Id
		{
			var user = _context.Users.Find(id);
			try
			{
				return user;
			}
			catch
			{
				throw new Exception("Not Found!!");
			}
		}

		public User UpdateUser(int id, User user)
		{
			var updateUser = _context.Users.FirstOrDefault(x => x.UserId == id);
			if (updateUser == null)
			{
				return null;
			}
			try
			{
				if (!string.IsNullOrEmpty(user.UserName))
				{
					updateUser.UserName = user.UserName;
				}
				if (!string.IsNullOrEmpty(user.Email))
				{
					updateUser.Email = user.Email;
				}
				if (user.DateOfBirth != null)
				{
					updateUser.DateOfBirth = user.DateOfBirth;
				}
				if (!string.IsNullOrEmpty(user.PhoneNumber))
				{
					updateUser.PhoneNumber = user.PhoneNumber;
				}
				if (!string.IsNullOrEmpty(user.Gender))
				{
					updateUser.Gender = user.Gender;
				}
				if (!string.IsNullOrEmpty(user.Address))
				{
					updateUser.Address = user.Address;
				}

				_context.SaveChanges();
				return updateUser;
			}
			catch
			{
				throw new Exception("User Not Updated!!");
			}
		}

		public bool ChangePassword(string email, string newPassword)
		{
			var user = _context.Users.Where(x => x.Email == email).FirstOrDefault();
			if (user != null)
			{
				user.Password = newPassword;
				_context.SaveChanges();
				return true;
			}
			return false;
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

			var userImg = dbContext.Users.FirstOrDefault(r => r.UserId == id);
			if (userImg == null)
				return false;

			userImg.ProfileImg = imageData;
			dbContext.SaveChanges();

			return true;
		}
	}
}
