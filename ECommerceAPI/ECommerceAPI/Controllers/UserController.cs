using ECommerceAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ECommerceAPI.Models.Authentication.Login;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using MimeKit;
using MailKit.Net.Smtp;
using ECommerceAPI.Data;
using System.Security.Cryptography;

namespace ECommerceAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[EnableCors("AllowOrigin")]
	public class UserController : ControllerBase
	{
		private readonly UserService _userService;
		private readonly IConfiguration _configuration;

		public UserController(UserService userService, IConfiguration configuration)
		{
			_userService = userService;
			_configuration = configuration;
		}

		[HttpGet]
		public ActionResult<List<User>> GetAllUsers()
		{
			var users = _userService.GetAllUsers().ToList();
			return users;
		}

		[HttpGet]
		[Route("GetUserById/{id}")]
		public ActionResult<User> GetUserById(int id)
		{
			return _userService.GetUserById(id);
		}

		[HttpGet]
		[Route("GetUserByEmail/{email}")]
		public User GetUserByEmail(string email, string Password)
		{
			return _userService.GetUserByEmail(email, Password);
		}

		[HttpPost]
		public ActionResult<User> AddUser([FromBody] User user)
		{
			try
			{
				var addUser = _userService.AddUser(user);
				return Ok(addUser);
			}
			catch
			{
				return StatusCode(400, "Could Not Add!!");
			}

		}
		[HttpGet("GetByEmail")]
		[EnableCors("AllowOrigin")]
		public ActionResult<User> GetByEmail(string email)
		{
			var user = _userService.GetByEmail(email);
			if(user != null)
			{
				return Ok(user.UserId);
			}
			return NotFound("No User");
		}

		[HttpPut]
		[Route("UpdateUser/{Id}")]
		public ActionResult<User> UpdateUser(int Id, [FromBody] User user)
		{
			var updateUser = _userService.UpdateUser(Id, user);
			if (updateUser == null)
			{
				return NotFound("The requested user doesn't exist!!");
			}
			return Ok(updateUser);
		}

		[HttpDelete]
		[Route("DeleteUser/{Id}")]
		public ActionResult<string> DeleteUser(int Id)
		{
			var deleteUser = _userService.DeleteUser(Id);
			if (deleteUser == null)
			{
				return NotFound("User doesn't exist!!");
			}
			return Ok("User Deleted");
		}



		[HttpPost("LoginUser")]
		[EnableCors("AllowOrigin")]
		public ActionResult Login(LogIn model)
		{
			var userAvailable = _userService.GetByEmail(model.Email);
			if(userAvailable != null && VerifyPassword(userAvailable.Password, model.Password))
			{
				var token = GenerateJwtToken(userAvailable.Email);
				return Ok(new { token, email = userAvailable.Email });
			}
			return BadRequest(404);

		}

		[HttpPost("ChangePassword")]
		[EnableCors("AllowOrigin")]
		public ActionResult ChangePassword(string email, string newPassword)
		{
			try
			{
				newPassword = HashPassword(newPassword);
				var changedPassword = _userService.ChangePassword(email, newPassword);
				if (changedPassword == true)
				{
					return Ok();
				}

				return StatusCode(400, "Some Error Occurred");
			}
			catch
			{
				return StatusCode(400, "Some Error Occurred");
			}
		}


		[HttpPost("CreateUser")]
		[EnableCors("AllowOrigin")]
		public ActionResult<User> Create([FromBody] User user)
		{
			try
			{
				user.Password = HashPassword(user.Password);
				var userCreated =  _userService.AddUser(user);
				SendNewRegisterEmail(user.Email).Wait();
				return Ok(userCreated);
			}
			catch
			{
				return BadRequest(404);
			}
		}

		[HttpPost("ForgotPassword")]
		[EnableCors("AllowOrigin")]
		public ActionResult<string> ForgotPassword(string email)
		{
			var user = _userService.GetByEmail(email);
			if (user == null)
			{
				return BadRequest("User not found.");
			}

			// Send the password reset email
			SendForgotPasswordEmail(user.Email).Wait(); 
			return Ok();
		}
		private const string ResetPasswordLink = "http://localhost:4200/changePassword";

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
		private async Task SendForgotPasswordEmail(string recipientEmail)
		{
			try
			{
				var senderEmail = "rajkishoresunny744@gmail.com"; 
				var senderName = "The EShoppingZone Team";
				var subject = "Password Reset Request";
				var body = $"Dear User,\n\nYou have requested a password reset. Please click the link below to reset your password:\n\n{string.Format(ResetPasswordLink)}\n\nIf you did not request a password reset, please ignore this email.\n\nRegards,\nThe EShoppingZone Team";

				var message = new MimeMessage();
				message.From.Add(new MailboxAddress(senderName, senderEmail));
				message.To.Add(new MailboxAddress(recipientEmail, recipientEmail));
				message.Subject = subject;

				var bodyBuilder = new BodyBuilder();
				bodyBuilder.TextBody = body;
				message.Body = bodyBuilder.ToMessageBody();

				using (var client = new SmtpClient())
				{
					client.Connect("smtp.gmail.com", 587); 
					client.Authenticate("rajkishoresunny744@gmail.com", "ahhstvnqvcsspgoo");

					await client.SendAsync(message);
					client.Disconnect(true);
				}
			}
			catch
			{
				throw new Exception("Could not send");
			}
		}
		private const string WebsiteLink = "http://localhost:4200";
		private async Task SendNewRegisterEmail(string recipientEmail)
		{
			try
			{
				var senderEmail = "rajkishoresunny744@gmail.com";
				var senderName = "The EShoppingZone Team";
				var subject = "Welcome to EShopping Zone Family!!!";
				var body = $"Dear {recipientEmail},\n\nWelcome to our family of EShopping Zone. Visit the website and shop for exciting products waiting just for you😊😊\n\n{string.Format(WebsiteLink)}\n\nRegards,\nThe EShoppingZone Team";

				var message = new MimeMessage();
				message.From.Add(new MailboxAddress(senderName, senderEmail));
				message.To.Add(new MailboxAddress(recipientEmail, recipientEmail));
				message.Subject = subject;

				var bodyBuilder = new BodyBuilder();
				bodyBuilder.TextBody = body;
				message.Body = bodyBuilder.ToMessageBody();

				using (var client = new SmtpClient())
				{
					client.Connect("smtp.gmail.com", 587);
					client.Authenticate("rajkishoresunny744@gmail.com", "ahhstvnqvcsspgoo");

					await client.SendAsync(message);
					client.Disconnect(true);
				}
			}
			catch
			{
				throw new Exception("Could not send");
			}
		}
		private string GenerateJwtToken(string userEmail)
		{
			var jwtSecretKey = _configuration["Jwt:Key"];
			var jwtIssuer = _configuration["Jwt:Issuer"];
			var jwtAudience = _configuration["Jwt:Audience"];

			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
				new Claim(ClaimTypes.Email, userEmail)
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

		[HttpPost("UploadImage")]
		[EnableCors("AllowOrigin")]
		public IActionResult UploadImage(IFormFile formFile, [FromServices] EshoppingZoneContext dbContext, int id)
		{
			var img = _userService.UploadImage(formFile, dbContext, id);
			if (img == true)
			{
				return Ok(id);
			}
			return BadRequest("Could not Add");
		}
	}
}
