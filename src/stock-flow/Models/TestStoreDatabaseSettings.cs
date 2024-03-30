namespace stock_flow.Models
{
    public class TestStoreDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string TestCollectionName { get; set; } = null!;
    }
}
