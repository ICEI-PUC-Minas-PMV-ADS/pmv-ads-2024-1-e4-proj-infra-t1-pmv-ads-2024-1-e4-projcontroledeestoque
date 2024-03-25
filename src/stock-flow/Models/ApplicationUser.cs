using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace stock_flow.Models
{
    [CollectionName("users")]
    public class ApplicationUser : MongoIdentityUser<Guid>
    {
       public string FullName { get; set; } = string.Empty;
    }
}
