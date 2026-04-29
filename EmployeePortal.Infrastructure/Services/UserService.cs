using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePortal.Application.DTOs;
using EmployeePortal.Application.Interfaces;
using EmployeePortal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeePortal.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> GetCurrentUserAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);

            return new UserDto
            {
                Name = user?.Name,
                Email = user?.Email,
                Department = user?.Department,
                Designation = user?.Designation
            };
        }

        public async Task<List<UserDto>> GetAllUserAsync()
        {
            return await _context.Users
                            .Select(u => new UserDto
                            {
                                Name = u.Name,
                                Email = u.Email,
                                Department = u.Department,
                                Designation = u.Designation
                            }).ToListAsync();
        }

    }
}
