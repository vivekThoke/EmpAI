using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePortal.Application.DTOs;
using EmployeePortal.Application.Interfaces;
using EmployeePortal.Infrastructure.Data;

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

    }
}
