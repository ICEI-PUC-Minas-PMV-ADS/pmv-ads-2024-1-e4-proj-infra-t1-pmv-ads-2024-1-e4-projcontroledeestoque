using System.ComponentModel.DataAnnotations;

namespace stock_flow.Controllers.Responses
{
    public class LoginResponse : AuthResponse
    {
        public string AccessToken { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
    }
}
