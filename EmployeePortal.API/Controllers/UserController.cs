using System.Security.Claims;
using System.Threading.Tasks;
using EmployeePortal.Application.DTOs;
using EmployeePortal.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        private Guid GetUserId()
        {
            return Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var user = await _userService.GetCurrentUserAsync(GetUserId());
            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllUserAsync();
            return Ok(users);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateUserDto dto)
        {
            await _userService.UpdateUserAsync(GetUserId(), dto);
            return Ok("Updated Successfully");
        }
    }
}
