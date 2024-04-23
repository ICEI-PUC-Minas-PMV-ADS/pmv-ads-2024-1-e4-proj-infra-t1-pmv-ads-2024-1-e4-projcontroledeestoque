using System.ComponentModel.DataAnnotations;

namespace stock_flow.Controllers.Requests
{
    public class RegisterRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required, MinLength(8), DataType(DataType.Password)]
        public string Senha { get; set; } = string.Empty;
        [Required, MinLength(8), DataType(DataType.Password), Compare(nameof(Senha), ErrorMessage = "Senhas não conferem")]
        public string SenhaConfirmada { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
    }
}
