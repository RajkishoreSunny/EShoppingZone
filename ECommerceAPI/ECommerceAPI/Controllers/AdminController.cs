using ECommerceAPI.Models;
using ECommerceAPI.Models.Authentication.Login;
using ECommerceAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly AdminService _adminService;
		private readonly IConfiguration _configuration;

		public AdminController(AdminService adminService, IConfiguration configuration)
		{
			_adminService = adminService;
			_configuration = configuration;
		}

		[HttpGet]
		public ActionResult<List<Admin> > GetAllAdmins() 
		{
			var admins = _adminService.GetAllAdmins();
			return Ok(admins);
		}

		[HttpGet]
		[Route("GetAdminById/{Id}")]
		public ActionResult<Admin> GetAdminById(int Id)
		{
			var admin = _adminService.GetAdminById(Id);
			if(admin == null)
			{
				return NotFound("Requested Admin doesn't exist!!");
			}
			return Ok(admin);
		}

		[HttpPost]
		public ActionResult<List<Admin> > AddAdmin([FromBody] Admin admin)
		{
			try
			{
				var addAdmin = _adminService.AddAdmin(admin);
				return Ok(addAdmin);
			}
			catch
			{
				return StatusCode(400, "Could Not Add!!");
			}
			
		}

		[HttpPut]
		[Route("UpdateAdmin/{Id}")]
		public ActionResult<List<Admin> > UpdateAdmin(int Id, [FromBody] Admin admin) 
		{
			var updateAdmin = _adminService.UpdateAdmin(Id, admin);
			if(updateAdmin == null)
			{
				return NotFound("The requested admin doesn't exist!!");
			}
			return Ok(updateAdmin);
		}

		[HttpDelete]
		[Route("DeleteAdmin/{Id}")]
		public ActionResult<List<Admin> > DeleteAdmin(int Id)
		{
			var deleteAdmin = _adminService.DeleteAdmin(Id);
			if(deleteAdmin == null) 
			{
				return NotFound("Admin doesn't exist!!");
			}
			return Ok(deleteAdmin);
		}

		[HttpPost("AdminLogin")]
		[EnableCors("AllowOrigin")]
		public IActionResult AdminLogin(LogIn logIn)
		{
			var admin = _adminService.GetByEmail(logIn.Email);
			var truthness = VerifyPassword(admin.Password, logIn.Password);
			if (truthness == true)
			{
				var authenticate = _adminService.authenticateAdmin(logIn);
				var token = GenerateJwtToken(logIn.Email);
				var response = new { message = "Login Successful", token };
				return Ok(response);
			}
			return BadRequest("Invalid Credentials");
		}
		private string HashPassword(string password)
		{
			using (var sha256 = SHA256.Create())
			{
				byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
				byte[] hashBytes = sha256.ComputeHash(passwordBytes);
				string hashedPassword = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

				return hashedPassword;
			}
		}
		private bool VerifyPassword(string hashPassword, string inputPassword)
		{
			string hashedInputPassword = HashPassword(inputPassword);
			return hashPassword == hashedInputPassword;
		}
		private string GenerateJwtToken(string Email)
		{
			var jwtSecretKey = _configuration["Jwt:Key"];
			var jwtIssuer = _configuration["Jwt:Issuer"];
			var jwtAudience = _configuration["Jwt:Audience"];

			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
				new Claim(ClaimTypes.Email, Email)
			};

			var token = new JwtSecurityToken(
				jwtIssuer,
				jwtAudience,
				claims,
				expires: DateTime.UtcNow.AddHours(1),
				signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

	}
}
