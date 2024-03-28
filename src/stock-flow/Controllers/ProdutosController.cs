using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using stock_flow.Models;
using stock_flow.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BookStoreApi.Models;

namespace stock_flow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : Controller
    {
        private readonly IMongoCollection<Produto> _productsCollection;
        public ProdutosController(
              IOptions<StockFlowStoreDatabaseSettings> productStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                productStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                productStoreDatabaseSettings.Value.DatabaseName);

            _productsCollection = mongoDatabase.GetCollection<Produto>(
                productStoreDatabaseSettings.Value.BooksCollectionName);
        }

        [HttpGet]
        public async Task<ActionResult<List<Produto>>> GetAsync()
        {
            var model = await _productsCollection.Find(_ => true).ToListAsync();
            return Ok(model);
        }

        [HttpGet]
        public async Task<ActionResult<Produto?>> GetAsync(string id)
        {
            var model = await _productsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return Ok(model);
        }


        [HttpPost]
        public async Task<ActionResult> CreateAsync(Produto newProduct)
        {
            await _productsCollection.InsertOneAsync(newProduct);
            return Ok(newProduct);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateAsync(string id, Produto updatedProduct) 
        { 
            var model = await _productsCollection.ReplaceOneAsync(x => x.Id == id, updatedProduct);
            return Ok(model);
        }

        [HttpDelete]
        public async Task<ActionResult>  RemoveAsync(string id)
        {
            var model =  await _productsCollection.DeleteOneAsync(x => x.Id == id);
            return Ok(model);
        }

    }
}