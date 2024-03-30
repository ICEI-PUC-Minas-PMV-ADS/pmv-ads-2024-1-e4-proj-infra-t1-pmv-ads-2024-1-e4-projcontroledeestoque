using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services
{
    public interface IAuthService
    {
        Task RegisterAsync(ApplicationUser user, string password);
        Task RoleAsync(ApplicationRole role);
        Task AddRoleUserAsync(ApplicationUser user, string role);
        Task<LoginDto> LoginAsync(string email, string password);
    }
}
