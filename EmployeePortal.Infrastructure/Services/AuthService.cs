using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePortal.Application.DTOs;
using EmployeePortal.Application.Interfaces;
using EmployeePortal.Domain.Entities;
using EmployeePortal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace EmployeePortal.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _dbContext;
        private readonly ITokenService _tokenService;

        public AuthService(AppDbContext dbContext, ITokenService tokenService)
        {
            _dbContext = dbContext;
            _tokenService = tokenService;
        }

        public async Task<string> RegisterAsync(RegisterDto dto)
        {
            var emailExists = await _dbContext.Users.AnyAsync(x => x.Email == dto.Email);

            if (emailExists)
                throw new Exception("Email already exists");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Employee"
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return "User Register Successfully";
        }
    }
}
