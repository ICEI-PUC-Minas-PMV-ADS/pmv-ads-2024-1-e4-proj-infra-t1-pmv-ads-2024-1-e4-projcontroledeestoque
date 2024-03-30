using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using stock_flow.Dtos;
using stock_flow.Exceptions;
using stock_flow.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace stock_flow.Services.Impl
{
    public class AuthService:IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task RegisterAsync(ApplicationUser user, string password)
        {
            var userExists = await _userManager.FindByEmailAsync(user.Email);

            if (userExists != null)
            {
                throw new AuthException("User already exists!");
            }

            var result = await _userManager.CreateAsync(user, password);
            
            if (!result.Succeeded)
            {
                throw new AuthException("An error occurred: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }

        public async Task RoleAsync(ApplicationRole role)
        {
            var result = await _roleManager.CreateAsync(role);

            if (!result.Succeeded)
            {
                throw new AuthException("An error occurred: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }

        public async Task AddRoleUserAsync(ApplicationUser user, string role)
        {
            if (!string.IsNullOrEmpty(role))
            {
                var result = await _userManager.AddToRoleAsync(user, role);
                if (!result.Succeeded)
                {
                    throw new AuthException("An error occurred: " + string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
        }

        public async Task<LoginDto> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email) ?? throw new AuthException("Invalid email/password");

            var isValid = await _userManager.CheckPasswordAsync(user, password);
            if (!isValid)
            {
                throw new AuthException("Invalid email/password");
            }

            // Authenticate and Generate JWT token
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ClaimTypes.Name, user.FullName),
                new(ClaimTypes.Email, user.Email),
                new(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(role => new Claim(ClaimTypes.Role, role));
            claims.AddRange(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("MIICXQIBAAKBgQDgjWqdGP6wgDk04hOMnEEq/ZDwMi9RyfOqTRj60gwwsQtQJrWt"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(60);

            var token = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: claims,
                expires: expires,
                signingCredentials: creds);

            return new LoginDto
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                Email = user.Email,
                UserId = user.Id.ToString()
            };
        }
    }
}
