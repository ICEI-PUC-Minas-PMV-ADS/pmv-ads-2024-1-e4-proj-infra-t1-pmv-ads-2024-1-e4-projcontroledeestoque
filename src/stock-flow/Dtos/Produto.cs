using System.ComponentModel.DataAnnotations;

namespace stock_flow.Dtos
{
    public class Produto
    {
        [Required]
        public string Id { get; set; } = string.Empty;

        private Categoria? categoria;

        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        Categoria Categoria { get; set; }

        [Required]
        public double PrecoCusto { get; set; }

        [Required]
        public double PrecoVenda { get; set; }

        [Required]
        public int Quantidade { get; set; }

        public string Imagem { get; set; } = string.Empty;
    }
}
