using System.ComponentModel.DataAnnotations;

namespace stock_flow.Dtos
{
    public class RoleResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
