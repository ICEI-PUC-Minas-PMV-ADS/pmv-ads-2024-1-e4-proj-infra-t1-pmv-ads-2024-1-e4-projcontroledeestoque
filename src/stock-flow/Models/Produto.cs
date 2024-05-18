using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace stock_flow.Models
{
    [CollectionName("produtos")]
    public class Produto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public List<string> Categorias { get; set; } = new();

        public decimal PrecoCusto { get; set; }

        public decimal PrecoVenda { get; set; }

        public int Quantidade { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public List<string> Fornecedores { get; set; } = new();
    }
}
