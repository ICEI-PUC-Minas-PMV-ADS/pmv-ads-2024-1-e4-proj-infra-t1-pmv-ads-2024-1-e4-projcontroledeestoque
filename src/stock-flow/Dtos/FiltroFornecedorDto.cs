namespace stock_flow.Dtos
{
    public class FiltroProdutoDto
    {
        public string? Nome { get; set; }
        public string? Categoria { get; set; }
        public string? Quantidade { get; set; }
        public string? QuantidadeMinima { get; set; }
        public string? QuantidadeMaxima { get; set; }
        public string? PrecoCustoMinimo { get; set; }
        public string? PrecoCustoMaximo { get; set; }
        public string? PrecoVendaMinimo { get; set; }
        public string? PrecoVendaMaximo { get; set; }
        public string? Fornecedor { get; set; }
    }
}
