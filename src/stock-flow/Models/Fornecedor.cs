using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace stock_flow.Models
{
    [CollectionName("fornecedores")]
    public class Fornecedor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Contato { get; set; } = string.Empty;

        public string Endereco { get; set; } = string.Empty;
    }
}
