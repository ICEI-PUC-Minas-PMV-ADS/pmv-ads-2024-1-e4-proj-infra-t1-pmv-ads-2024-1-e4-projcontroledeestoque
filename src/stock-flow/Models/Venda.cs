using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace stock_flow.Models
{
    [CollectionName("vendas")]
    public class Venda
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string User { get; set; } = string.Empty;

        public string Produto { get; set; } = string.Empty;

        public List<string> Categorias { get; set; } = new List<string>();

        public decimal ValorVenda { get; set; }

        public int Quantidade { get; set; }

        public string Imagem { get; set; } = string.Empty;
    }
}
