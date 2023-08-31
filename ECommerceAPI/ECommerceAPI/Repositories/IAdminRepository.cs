using ECommerceAPI.Models.Authentication.Login;

namespace ECommerceAPI.Repositories
{
	public interface IAdminRepository
	{
		public List<Admin> GetAllAdmins();
		public Admin GetAdminById(int id);
		public List<Admin> AddAdmin(Admin admin);
		public List<Admin> UpdateAdmin(int id, Admin admin);
		public List<Admin> DeleteAdmin(int id);
		public bool authenticateAdmin(LogIn login);
		public Admin GetByEmail(string email);
	}
}

