using System.ComponentModel.DataAnnotations;

namespace stock_flow.Dtos
{
    public class MovimentacaoDto
    {
        [Required]
        public string Produto { get; set; } = string.Empty;

        [Required]
        public string Tipo { get; set; } = string.Empty;

        [Required]
        public int Quantidade { get; set; }

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public string Usuario { get; set; } = string.Empty;

        public DateTime Data { get; set; } = DateTime.Now;
    }
}
