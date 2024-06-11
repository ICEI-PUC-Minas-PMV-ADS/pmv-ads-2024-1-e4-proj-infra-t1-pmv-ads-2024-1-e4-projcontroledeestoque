using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using stock_flow.Configs;
using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services.Impl
{
    public class FornecedorService : IFornecedorService
    {
        private readonly IMongoCollection<Fornecedor> _fornecedoresCollection;
        private readonly Lazy<IProdutoService> _produtoService;

        public FornecedorService(IOptions<FornecedoresDatabaseSettings> fornecedoresDatabaseSettings,
            Lazy<IProdutoService> produtoService)
        {
            var mongoClient = new MongoClient(fornecedoresDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(fornecedoresDatabaseSettings.Value.DatabaseName);

            _fornecedoresCollection =
                mongoDatabase.GetCollection<Fornecedor>(fornecedoresDatabaseSettings.Value.FornecedoresCollectionName);

            _produtoService = produtoService;
        }

        public async Task<Fornecedor> CreateFornecedorAsync(FornecedorDto fornecedorDto)
        {
            var fornecedor = new Fornecedor
            {
                Nome = fornecedorDto.Nome,
                Contato = fornecedorDto.Contato,
                Endereco = fornecedorDto.Endereco
            };

            await _fornecedoresCollection.InsertOneAsync(fornecedor);
            return fornecedor;
        }

        public async Task DeleteFornecedorAsync(string id)
        {
            _ = await _fornecedoresCollection.DeleteOneAsync(x => x.Id == id) ??
                throw new Exception("Fornecedor não encontrado");
            
            await _produtoService.Value.RemoveFornecedorFromProdutosAsync(id);
        }

        public async Task<Fornecedor> GetFornecedorByIdAsync(string id)
        {
            return await _fornecedoresCollection.Find(x => x.Id == id).FirstOrDefaultAsync() ??
                   throw new Exception("Fornecedor não encontrado");
        }

        public async Task<IEnumerable<Fornecedor>> GetFornecedorAsync()
        {
            return await _fornecedoresCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Fornecedor> UpdateFornecedorAsync(string id, FornecedorDto fornecedorDto)
        {
            var fornecedor = await GetFornecedorByIdAsync(id);

            fornecedor.Nome = fornecedorDto.Nome;
            fornecedor.Contato = fornecedorDto.Contato;
            fornecedor.Endereco = fornecedorDto.Endereco;

            await _fornecedoresCollection.ReplaceOneAsync(x => x.Id == id, fornecedor);
            return fornecedor;
        }

        public async Task<List<Fornecedor>> GetFornecedorsByFiltroAsync(FiltroFornecedorDto filtroFornecedorDto)
        {
            var filter = Builders<Fornecedor>.Filter.Empty;

            if (!string.IsNullOrEmpty(filtroFornecedorDto.Nome))
            {
                filter &= Builders<Fornecedor>.Filter.Regex(p => p.Nome,
                    new BsonRegularExpression(filtroFornecedorDto.Nome, "i"));
            }

            if (!string.IsNullOrEmpty(filtroFornecedorDto.Contato))
            {
                filter &= Builders<Fornecedor>.Filter.Regex(p => p.Contato,
                    new BsonRegularExpression(filtroFornecedorDto.Contato, "i"));
            }

            if (!string.IsNullOrEmpty(filtroFornecedorDto.Endereco))
            {
                filter &= Builders<Fornecedor>.Filter.Regex(p => p.Endereco,
                    new BsonRegularExpression(filtroFornecedorDto.Endereco, "i"));
            }

            return await _fornecedoresCollection.Find(filter).SortBy(p => p.Nome).ToListAsync();
        }
    }
}