using System.ComponentModel.DataAnnotations;

namespace stock_flow.Controllers.Responses
{
    public class LoginResponse : AuthResponse
    {
        public string? AccessToken { get; set; }
        public string? Email { get; set; }
        public string? UserId { get; set; }
    }
}
