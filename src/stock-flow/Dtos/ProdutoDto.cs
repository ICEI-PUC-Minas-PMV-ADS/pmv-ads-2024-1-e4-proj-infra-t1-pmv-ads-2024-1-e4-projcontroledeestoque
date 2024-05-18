using System.ComponentModel.DataAnnotations;

namespace stock_flow.Dtos
{
    public class ProdutoDto
    {
        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public List<string> Categorias { get; set; } = new();

        [Required]
        public decimal PrecoCusto { get; set; }

        [Required]
        public decimal PrecoVenda { get; set; }

        public int Quantidade { get; set; } = 0;

        public List<string>? Fornecedores { get; set; }
    }
}
