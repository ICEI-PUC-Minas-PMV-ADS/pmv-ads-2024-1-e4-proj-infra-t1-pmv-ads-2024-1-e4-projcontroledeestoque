namespace stock_flow.Configs
{
    public class MovimentacoesDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string MovimentacoesCollectionName { get; set; } = null!;
    }
}
