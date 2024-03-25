using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace stock_flow.Models
{
    [CollectionName("roles")]
    public class ApplicationRole : MongoIdentityRole<Guid>
    {
       public string FullName { get; set; } = string.Empty;
    }
}
