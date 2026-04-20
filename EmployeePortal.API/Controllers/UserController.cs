using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        [Authorize]
        [HttpGet("me")]
        public IActionResult GetMe()
        {
            return Ok("You are authenticated");
        }
    }
}
