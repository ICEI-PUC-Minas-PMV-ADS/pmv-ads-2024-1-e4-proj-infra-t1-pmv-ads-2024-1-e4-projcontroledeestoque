using Microsoft.Extensions.Options;
using MongoDB.Driver;
using stock_flow.Configs;
using stock_flow.Dtos;
using stock_flow.Models;
using static System.Net.Mime.MediaTypeNames;

namespace stock_flow.Services.Impl
{
    public class CompraService : ICompraService
    {
        private readonly IMongoCollection<Compra> _comprasCollection;

        public CompraService(IOptions<ComprasDatabaseSettings> comprasDatabaseSettings)
        {
            var mongoClient = new MongoClient(comprasDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(comprasDatabaseSettings.Value.DatabaseName);

            _comprasCollection = mongoDatabase.GetCollection<Compra>(comprasDatabaseSettings.Value.ComprasCollectionName);
        }

        public async Task<Compra> CreateCompraAsync(CompraDto compraDto)
        {


            var compra = new Compra
            {
                Id = compraDto.Id,
                Produto = compraDto.Produto,
                Fornecedor = compraDto.Fornecedor,
                Categorias = compraDto.Categorias,
                PrecoCusto = compraDto.PrecoCusto,
                Quantidade = compraDto.Quantidade,
                Imagem = compraDto.Imagem,
            };

            await _comprasCollection.InsertOneAsync(compra);
            return compra;

    }

        public async Task DeleteCompraAsync(string id)
        {
            _ = await _comprasCollection.DeleteOneAsync(x => x.Id == id) ??
                throw new Exception("Produto não encontrado");
        }

        public async Task<IEnumerable<Compra>> GetCompraAsync()
        {
            return await _comprasCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Compra> GetCompraByIdAsync(string id)
        {
            return await _comprasCollection.Find(x => x.Id == id).FirstOrDefaultAsync() ??
                throw new Exception("Produto não encontrado");
        }

        public async Task<Compra> GetCompraByProdutoAsync(string produto)
        {
            return await _comprasCollection.Find(x => x.Produto == produto).FirstOrDefaultAsync() ??
                throw new Exception("Produto não encontrado");
        }

        public async Task<Compra> UpdateCompraAsync(string id, CompraDto compraDto)
        {
            var compra = await GetCompraByIdAsync(id);

            compra.Id = compraDto.Id;
            compra.Produto = compraDto.Produto;
            compra.Fornecedor = compraDto.Fornecedor;
            compra.Categorias = compraDto.Categorias;
            compra.PrecoCusto = compraDto.PrecoCusto;
            compra.Quantidade = compraDto.Quantidade;
            compra.Imagem = compraDto.Imagem;
            
            await _comprasCollection.ReplaceOneAsync(x => x.Id == id, compra);
            return compra;
        }
    }
}
