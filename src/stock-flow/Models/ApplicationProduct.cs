using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;
using stock_flow.Dtos;
using System.ComponentModel.DataAnnotations;

namespace stock_flow.Models
{
    [CollectionName("products")]
    public class Products
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        Categoria Categoria { get; set; }

        public decimal PrecoCusto { get; set; }

        public decimal PrecoVenda { get; set; }

        public int Quantidade { get; set; }

        public string Imagem { get; set; } = string.Empty;
    }
}
