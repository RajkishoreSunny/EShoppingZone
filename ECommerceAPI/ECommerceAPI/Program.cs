
global using ECommerceAPI.Models;
using ECommerceAPI.Data;
using ECommerceAPI.Repositories;
using ECommerceAPI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: "AllowOrigin", builder =>
	{
		builder.WithOrigins("https://localhost:7092",
						   "http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
	});
});

string jwtSecretKey = builder.Configuration["Jwt:Key"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
		.AddJwtBearer(options =>
		{
			options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = false,
				ValidateAudience = false,
				ValidateLifetime = true,
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey))
			};
		});

// Add services to the container.
builder.Services.AddControllers();

//EntityFramework
builder.Services.AddDbContext<EshoppingZoneContext>(
	options => options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection"))
	);

//For Identity

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
	options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme 
	{
		In = ParameterLocation.Header,
		Name = "Authorization",
		Type = SecuritySchemeType.ApiKey
	});
	options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<AdminService, AdminService>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ProductService, ProductService>();

builder.Services.AddScoped<IUser, UserRepository>();
builder.Services.AddScoped<UserService, UserService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<CartService, CartService>();

builder.Services.AddScoped<ICategory, CategoryRepository>();
builder.Services.AddScoped<CategoryService, CategoryService>();

builder.Services.AddScoped<IWishList, WishListRepository>();
builder.Services.AddScoped<WishListService, WishListService>();

builder.Services.AddScoped<IReview, ReviewRepository>();
builder.Services.AddScoped<ReviewService, ReviewService>();

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<OrderService, OrderService>();

builder.Services.AddScoped<IFeedback, FeedbackRepository>();
builder.Services.AddScoped<FeedbackService, FeedbackService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

app.UseEndpoints(endpoints =>
{
	endpoints.MapControllers();
});
