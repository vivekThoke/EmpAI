using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeePortal.Application.DTOs;

namespace EmployeePortal.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetCurrentUserAsync(Guid userId);
        Task<List<UserDto>> GetAllUserAsync();
        Task UpdateUserAsync(Guid userId, UpdateUserDto dto);
    }
}
