using BCrypt.Net;
using EmployeePortal.Application.DTOs;
using EmployeePortal.Application.Interfaces;
using EmployeePortal.Domain.Entities;
using EmployeePortal.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(AppDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Email = dto.Email,  
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Employee"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == dto.Email);

            if (user == null || BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials");

            string token = _tokenService.GenerateToken(user);

            return Ok(new { token });
        }
    }
}
