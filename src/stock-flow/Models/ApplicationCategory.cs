using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using stock_flow.Dtos;
using System.ComponentModel.DataAnnotations;

namespace stock_flow.Models
{
    [CollectionName("category")]
    public class ApplicationCategory
    {
        public string Nome { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

    }
    
}