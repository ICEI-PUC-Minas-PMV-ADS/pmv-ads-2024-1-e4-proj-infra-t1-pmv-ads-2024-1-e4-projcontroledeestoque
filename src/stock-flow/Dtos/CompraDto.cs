using System.ComponentModel.DataAnnotations;

namespace stock_flow.Dtos
{
    public class CompraDto
    {
        [Required]
        public string? Id { get; set; }

        [Required]
        public string Produto { get; set; } = string.Empty;

        [Required]
        public string Fornecedor { get; set; } = string.Empty;

        [Required]
        public List<string> Categorias { get; set; } = new List<string>();

        [Required]
        public decimal PrecoCusto { get; set; }

        [Required]
        public int Quantidade { get; set; }

        public string Imagem { get; set; } = string.Empty;
    }
}
