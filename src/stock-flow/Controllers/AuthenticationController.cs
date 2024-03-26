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

        public AuthenticationController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType((int) HttpStatusCode.OK, Type = typeof(LoginResponse))]
        public async Task<IActionResult> Login([FromBody]LoginRequest request)
        {
            var result = await LoginAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        [HttpPost("register")]
        public IActionResult Register()
        {
            return Ok();
        }

        private async Task<LoginResponse> LoginAsync(LoginRequest request)
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
    }
}
