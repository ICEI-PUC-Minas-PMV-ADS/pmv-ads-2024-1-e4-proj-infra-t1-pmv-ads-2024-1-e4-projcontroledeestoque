using System.ComponentModel.DataAnnotations;

namespace stock_flow.Dtos
{
    public class FornecedorDto
    {
        public string Nome { get; set; } = string.Empty;

        public string Contato { get; set; } = string.Empty;

        public string Endereco { get; set; } = string.Empty;

    }
}