using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace stock_flow.Models
{
    [CollectionName("movimentacoes")]
    public class Movimentacao
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 

        public string Produto { get; set; } = string.Empty;

        public string Tipo { get; set; } = string.Empty;

        public int Quantidade { get; set; }

        public decimal Valor { get; set; }

        public string Usuario { get; set; } = string.Empty;

        public DateTime Data { get; set; }
    }
}
