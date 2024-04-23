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
        private readonly IFornecedorService _fornecedorService;

        public ProdutoService(IOptions<ProdutosDatabaseSettings> produtosDatabaseSettings,
            IFornecedorService fornecedorService)
        {
            var produtosConnectionString = produtosDatabaseSettings.Value.ConnectionString;

            var produtosClient = new MongoClient(produtosConnectionString);

            var produtosDatabase = produtosClient.GetDatabase(produtosDatabaseSettings.Value.DatabaseName);

            _produtosCollection =
                produtosDatabase.GetCollection<Produto>(produtosDatabaseSettings.Value.ProdutosCollectionName);
            _fornecedorService = fornecedorService;
        }

        public async Task<Produto> CreateProdutoAsync(ProdutoDto produtoDto)
        {
            produtoDto.FornecedoresId?.ForEach(id => _fornecedorService.GetFornecedorByIdAsync(id));

            var produto = new Produto
            {
                Nome = produtoDto.Nome,
                Descricao = produtoDto.Descricao,
                Categorias = produtoDto.Categorias,
                PrecoCusto = produtoDto.PrecoCusto,
                PrecoVenda = produtoDto.PrecoVenda,
                Quantidade = produtoDto.Quantidade,
                Imagem = produtoDto.Imagem,
                FornecedoresId = produtoDto.FornecedoresId
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
            produto.FornecedoresId = produtoDto.FornecedoresId;

            await _produtosCollection.ReplaceOneAsync(x => x.Id == id, produto);
            return produto;
        }

        public async Task<Produto> UpdateQuantidadeAsync(string id, int quantidade)
        {
            var produto = await GetProdutoByIdAsync(id);

            produto.Quantidade += quantidade;

            if (produto.Quantidade < 0)
            {
                throw new Exception("Quantidade insuficiente");
            }

            await _produtosCollection.ReplaceOneAsync(x => x.Id == id, produto);
            return produto;
        }

        public async Task<IEnumerable<Fornecedor>> GetFornecedoresDoProdutoAsync(string produtoId)
        {
            var produto = await _produtosCollection.Find(x => x.Id == produtoId).FirstOrDefaultAsync() ??
                          throw new Exception("Produto não encontrado");

            return produto.FornecedoresId?.Select(id => _fornecedorService.GetFornecedorByIdAsync(id).Result) ??
                   Array.Empty<Fornecedor>();
        }

        public async Task<IEnumerable<Produto>> GetProdutosComQuantidadeZeroAsync()
        {
            var filter = Builders<Produto>.Filter.Eq(p => p.Quantidade, 0);
            return await _produtosCollection.Find(filter).ToListAsync();
        }
    }
}
