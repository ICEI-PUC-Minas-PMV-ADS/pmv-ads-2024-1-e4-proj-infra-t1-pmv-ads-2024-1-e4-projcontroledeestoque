namespace stock_flow.Dtos
{
    public class FiltroDto
    {
        public string? DataInicio { get; set; }
        public string? DataFim { get; set; }
        public string? Produto { get; set; }
        public string? Usuario { get; set; }
        public string? TipoMovimentacao { get; set; }
        public string? Quantidade { get; set; }
        public string? QuantidadeMinima { get; set; }
        public string? QuantidadeMaxima { get; set; }
        public string? Valor { get; set; }
        public string? ValorMinimo { get; set; }
        public string? ValorMaximo { get; set; }
    }
}
