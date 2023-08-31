using ECommerceAPI.Models;
using ECommerceAPI.Models.Authentication.Login;
using ECommerceAPI.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ECommerceAPI.Services
{
	public class AdminService
	{
		private readonly IAdminRepository _adminRepository;

		public AdminService(IAdminRepository adminRepository)
		{
			_adminRepository = adminRepository;
		}
		public List<Admin> AddAdmin(Admin admin)
		{
			return _adminRepository.AddAdmin(admin);
		}

		public Admin GetAdminById(int id)
		{
			return _adminRepository.GetAdminById(id);
		}

		public List<Admin> GetAllAdmins()
		{
			return _adminRepository.GetAllAdmins();
		}
		public Admin GetByEmail(string email)
		{
			return _adminRepository.GetByEmail(email);
		}
		public List<Admin> UpdateAdmin(int id, Admin admin)
		{
			return _adminRepository.UpdateAdmin(id, admin);
		}
		public List<Admin> DeleteAdmin(int id)
		{
			return _adminRepository.DeleteAdmin(id);
		}

		public bool authenticateAdmin(LogIn login)
		{
			if(login != null) 
			{
				var user = _adminRepository.authenticateAdmin(login);
				if(user == true)
				{
					return true;
				}
			}
			return false;
		}
	}
}
