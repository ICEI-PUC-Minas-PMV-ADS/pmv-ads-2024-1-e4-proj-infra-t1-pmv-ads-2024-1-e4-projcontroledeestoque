using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace stock_flow.Dtos
{
    public class MovimentacaoAggregateDto
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonRepresentation(BsonType.ObjectId)]
        public string ProdutoId { get; set; } = string.Empty;

        public string ProdutoNome { get; set; } = string.Empty;

        [BsonRepresentation(BsonType.ObjectId)]
        public List<string> FornecedoresNomes { get; set; } = new();

        public string Tipo { get; set; } = string.Empty;

        public int Quantidade { get; set; }

        public decimal Valor { get; set; }

        public string Usuario { get; set; } = string.Empty;

        public DateTime Data { get; set; }
    }
}
