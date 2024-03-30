using Microsoft.Extensions.Options;
using MongoDB.Driver;
using stock_flow.Configs;
using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services.Impl
{
    public class ProdutoService : IProdutoService
    {
        private readonly IMongoCollection<Produto> _produtosCollection;
        
        public ProdutoService(IOptions<ProdutosDatabaseSettings> produtosDatabaseSettings)
        {
            var mongoClient = new MongoClient(produtosDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(produtosDatabaseSettings.Value.DatabaseName);

            _produtosCollection = mongoDatabase.GetCollection<Produto>(produtosDatabaseSettings.Value.ProdutosCollectionName);
        }

        public async Task<Produto> CreateProdutoAsync(ProdutoDto produtoDto)
        {
            var produto = new Produto
            {
                Nome = produtoDto.Nome,
                Descricao = produtoDto.Descricao,
                Categorias = produtoDto.Categorias,
                PrecoCusto = produtoDto.PrecoCusto,
                PrecoVenda = produtoDto.PrecoVenda,
                Quantidade = produtoDto.Quantidade,
                Imagem = produtoDto.Imagem
            };

            await _produtosCollection.InsertOneAsync(produto);
            return produto;
        }

        public async Task DeleteProdutoAsync(string id)
        {
            _ = await _produtosCollection.DeleteOneAsync(x => x.Id == id) ??
                throw new Exception("Produto não encontrado");
        }

        public async Task<Produto> GetProdutoByIdAsync(string id)
        {
            return await _produtosCollection.Find(x => x.Id == id).FirstOrDefaultAsync() ?? 
                throw new Exception("Produto não encontrado");
        }

        public async Task<IEnumerable<Produto>> GetProdutosAsync()
        {
            return await _produtosCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Produto> UpdateProdutoAsync(string id, ProdutoDto produtoDto)
        {
            var produto = await GetProdutoByIdAsync(id);

            produto.Nome = produtoDto.Nome;
            produto.Descricao = produtoDto.Descricao;
            produto.Categorias = produtoDto.Categorias;
            produto.PrecoCusto = produtoDto.PrecoCusto;
            produto.PrecoVenda = produtoDto.PrecoVenda;
            produto.Quantidade = produtoDto.Quantidade;
            produto.Imagem = produtoDto.Imagem;

            await _produtosCollection.ReplaceOneAsync(x => x.Id == id, produto);
            return produto;
        }
    }
}
