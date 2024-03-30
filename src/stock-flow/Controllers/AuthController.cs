using Microsoft.AspNetCore.Mvc;
using stock_flow.Controllers.Requests;
using stock_flow.Controllers.Responses;
using stock_flow.Models;
using stock_flow.Services;
using System.Net;

namespace stock_flow.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("roles")]
        public async Task<IActionResult> Role([FromBody] RoleRequest request)
        {
            try
            {
                var role = new ApplicationRole
                {
                    Name = request.Role,
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                };

                await _authService.RoleAsync(role);

                return Ok(new AuthResponse
                {
                    Success = true,
                    Message = "Role created successfully"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new AuthResponse
                {
                    Success = false,
                    Message = "An error occurred: " + ex.Message
                });
            }
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var user = new ApplicationUser
                {
                    Email = request.Email,
                    UserName = request.Email,
                    FullName = request.FullName,
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                };

                await _authService.RegisterAsync(user, request.Password);

                if (!string.IsNullOrEmpty(request.Role))
                {
                    await _authService.AddRoleUserAsync(user, request.Role);
                }

                return Ok(new AuthResponse
                {
                    Success = true,
                    Message = "User created successfully"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new AuthResponse
                {
                    Success = false,
                    Message = "An error occurred: " + ex.Message
                });
            }
        }


        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int) HttpStatusCode.OK, Type = typeof(LoginResponse))]
        public async Task<IActionResult> Login([FromBody]LoginRequest request)
        {
            try
            {
                var result = await _authService.LoginAsync(request.Email, request.Password);

                var response = new LoginResponse
                {
                    Success = true,
                    Message = "Login successful",
                    AccessToken = result.AccessToken,
                    Email = result.Email,
                    UserId = result.UserId
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new LoginResponse
                {
                    Success = false,
                    Message = "An error occurred: " + ex.Message
                });
            }
        }
    }
}
