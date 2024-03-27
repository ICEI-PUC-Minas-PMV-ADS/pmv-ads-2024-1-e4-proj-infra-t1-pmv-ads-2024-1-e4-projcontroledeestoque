using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using stock_flow.Dtos;
using stock_flow.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace stock_flow.Controllers
{
    [ApiController]
    [Route("api/v1/authenticate")]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public AuthenticationController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        [Route("roles")]
        public async Task<IActionResult> CreateRole([FromBody] RoleRequest request)
        {
            var appRole = new ApplicationRole
            {
                Name = request.Role,
                ConcurrencyStamp = Guid.NewGuid().ToString()
            };

            var result = await _roleManager.CreateAsync(appRole);

            return result.Succeeded ? Ok("Role created successfully") : 
                BadRequest("An error occurred: " + string.Join(", ", result.Errors.Select(e => e.Description)));
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await RegisterAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user != null)
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        Message = "Email already exists"
                    };
                }

                // Create new user
                user = new ApplicationUser
                {
                    Email = request.Email,
                    UserName = request.Email,
                    FullName = request.FullName,
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                };

                var result = await _userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        Message = "An error occurred: " + string.Join(", ", result.Errors.Select(e => e.Description))
                    };
                }

                // Add user to role
                if (!string.IsNullOrEmpty(request.Role))
                {
                    result = await _userManager.AddToRoleAsync(user, request.Role);
                    if (!result.Succeeded)
                    {
                        return new RegisterResponse
                        {
                            Success = false,
                            Message = "An error occurred: " + string.Join(", ", result.Errors.Select(e => e.Description))
                        };
                    }
                }

                // Everything went well
                return new RegisterResponse
                {
                    Success = true,
                    Message = "User created successfully"
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new RegisterResponse
                {
                    Success = false,
                    Message = "An error occurred: " + ex.Message
                };
            }
        }


        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int) HttpStatusCode.OK, Type = typeof(LoginResponse))]
        public async Task<IActionResult> Login([FromBody]LoginRequest request)
        {
            var result = await LoginAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user is null)
                {
                    return new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid email/password"
                    };
                }

                var isValid = await _userManager.CheckPasswordAsync(user, request.Password);
                if (!isValid)
                {
                    return new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid email/password"
                    };
                }

                // Authenticate and Generate JWT token
                var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

                var roles = await _userManager.GetRolesAsync(user);
                var roleClaims = roles.Select(role => new Claim(ClaimTypes.Role, role));
                claims.AddRange(roleClaims);

                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("MIICXQIBAAKBgQDgjWqdGP6wgDk04hOMnEEq/ZDwMi9RyfOqTRj60gwwsQtQJrWt"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expires = DateTime.Now.AddMinutes(60);

                var token = new JwtSecurityToken(
                    issuer: "http://localhost:5001",
                    audience: "http://localhost:5001",
                    claims: claims,
                    expires: expires,
                    signingCredentials: creds);

                return new LoginResponse
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Message = "Login successful",
                    Success = true,
                    Email = user.Email,
                    UserId = user.Id.ToString()
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new LoginResponse
                {
                    Success = false,
                    Message = "An error occurred: " + ex.Message
                };
            }
        }
    }
}
