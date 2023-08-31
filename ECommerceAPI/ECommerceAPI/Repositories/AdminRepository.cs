using ECommerceAPI.Data;
using ECommerceAPI.Models.Authentication.Login;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Repositories
{
    public class AdminRepository : IAdminRepository
	{
		private readonly EshoppingZoneContext _context;

		public AdminRepository(EshoppingZoneContext context)
		{
			_context = context;
		}
		public List<Admin> AddAdmin(Admin admin)
		{
			try
			{
				_context.Admins.Add(admin);
				_context.SaveChanges();
				return _context.Admins.ToList();
			}
			catch
			{
				return _context.Admins.ToList();
			}

		}

		public Admin GetAdminById(int id)
		{
			var admin = _context.Admins.Find(id);
			if (admin == null)
			{
				return null;
			}
			return admin;
		}
		public Admin GetByEmail(string email)
		{
			try
			{
				var admin = _context.Admins.Where(x => x.Email== email).FirstOrDefault();
				if(admin != null)
				{
					return admin;
				}
				return null;
			}
			catch
			{
				return null;
			}
		}

		public List<Admin> GetAllAdmins()
		{
			return _context.Admins.ToList();
		}

		public List<Admin> UpdateAdmin(int id, Admin admin)
		{
			var updateAdmin = _context.Admins.Find(id);
			if (updateAdmin == null)
			{
				return _context.Admins.ToList();
			}
			updateAdmin.Name = admin.Name;
			updateAdmin.Email = admin.Email;
			updateAdmin.DateOfBirth = admin.DateOfBirth;
			updateAdmin.Password = admin.Password;
			updateAdmin.Image = admin.Image;

			_context.SaveChanges();
			return _context.Admins.ToList();
		}
		public List<Admin> DeleteAdmin(int id)
		{
			var deleteAdmin = _context.Admins.Find(id);
			if (deleteAdmin == null)
			{
				return _context.Admins.ToList();
			}
			_context.Admins.Remove(deleteAdmin);
			_context.SaveChanges();
			return _context.Admins.ToList();
		}

		public bool authenticateAdmin(LogIn login)
		{
			try
			{
				var user = _context.Admins.FirstOrDefault(u => u.Email == login.Email);

				if (user != null)
				{
					// Authentication is successful
					return true;
				}

				// Authentication failed
				return false;
			}
			catch
			{
				// Exception occurred during authentication
				return false;
			}
		}
	}
}
