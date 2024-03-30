namespace stock_flow.Configs;

public class ProdutosDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string ProdutosCollectionName { get; set; } = null!;
}

