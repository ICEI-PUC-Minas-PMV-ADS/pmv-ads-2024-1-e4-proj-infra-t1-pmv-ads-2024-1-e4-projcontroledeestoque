using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
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
            produtoDto.Fornecedores?.ForEach(id => _fornecedorService.GetFornecedorByIdAsync(id));

            var produto = new Produto
            {
                Nome = produtoDto.Nome,
                Descricao = produtoDto.Descricao,
                Categorias = produtoDto.Categorias,
                PrecoCusto = produtoDto.PrecoCusto,
                PrecoVenda = produtoDto.PrecoVenda,
                Quantidade = produtoDto.Quantidade,
                Fornecedores = produtoDto.Fornecedores
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
            produtoDto.Fornecedores?.ForEach(fornecedorId => _fornecedorService.GetFornecedorByIdAsync(fornecedorId));

            produto.Nome = produtoDto.Nome;
            produto.Descricao = produtoDto.Descricao;
            produto.Categorias = produtoDto.Categorias;
            produto.PrecoCusto = produtoDto.PrecoCusto;
            produto.PrecoVenda = produtoDto.PrecoVenda;
            produto.Quantidade = produtoDto.Quantidade;
            produto.Fornecedores = produtoDto.Fornecedores;

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

            return produto.Fornecedores?.Select(id => _fornecedorService.GetFornecedorByIdAsync(id).Result) ??
                   Array.Empty<Fornecedor>();
        }

        public Task RemoveFornecedorFromProdutosAsync(string id)
        {
            var filter = Builders<Produto>.Filter.AnyEq(p => p.Fornecedores, id);
            var update = Builders<Produto>.Update.Pull(p => p.Fornecedores, id);

            return _produtosCollection.UpdateManyAsync(filter, update);
        }

        public async Task<IEnumerable<Produto>> GetProdutosComQuantidadeZeroAsync()
        {
            var filter = Builders<Produto>.Filter.Eq(p => p.Quantidade, 0);
            return await _produtosCollection.Find(filter).SortBy(produto => produto.Id).ToListAsync();
        }

        public Task<List<string>> GetCategoriasAsync()
        {
            return _produtosCollection.AsQueryable().SelectMany(p => p.Categorias).Distinct().ToListAsync();
        }

        public async Task<List<Produto>> GetProdutosByFiltroAsync(FiltroProdutoDto filtroProdutoDto)
        {
            var filter = Builders<Produto>.Filter.Empty;

            if (!string.IsNullOrEmpty(filtroProdutoDto.Nome))
            {
                filter &= Builders<Produto>.Filter.Or(
                    Builders<Produto>.Filter.Regex(p => p.Nome, new BsonRegularExpression(filtroProdutoDto.Nome, "i")),
                    Builders<Produto>.Filter.Regex(p => p.Descricao, new BsonRegularExpression(filtroProdutoDto.Nome, "i"))
                );
            }

            if (decimal.TryParse(filtroProdutoDto.PrecoCustoMinimo, out var precoCustoMinimo))
            {
                filter &= Builders<Produto>.Filter.Gte(p => p.PrecoCusto, precoCustoMinimo);
            }
            
            if (decimal.TryParse(filtroProdutoDto.PrecoCustoMaximo, out var precoCustoMaximo))
            {
                filter &= Builders<Produto>.Filter.Lte(p => p.PrecoCusto, precoCustoMaximo);
            }
            
            if (decimal.TryParse(filtroProdutoDto.PrecoVendaMinimo, out var precoVendaMinimo))
            {
                filter &= Builders<Produto>.Filter.Gte(p => p.PrecoVenda, precoVendaMinimo);
            }
            
            if (decimal.TryParse(filtroProdutoDto.PrecoVendaMaximo, out var precoVendaMaximo))
            {
                filter &= Builders<Produto>.Filter.Lte(p => p.PrecoVenda, precoVendaMaximo);
            }

            if (int.TryParse(filtroProdutoDto.Quantidade, out var quantidade))
            {
                filter &= Builders<Produto>.Filter.Eq(p => p.Quantidade, quantidade);
            }
            
            if (int.TryParse(filtroProdutoDto.QuantidadeMinima, out var quantidadeMinima))
            {
                filter &= Builders<Produto>.Filter.Gte(p => p.Quantidade, quantidadeMinima);
            }

            if (int.TryParse(filtroProdutoDto.QuantidadeMaxima, out var quantidadeMaxima))
            {
                filter &= Builders<Produto>.Filter.Lte(p => p.Quantidade, quantidadeMaxima);
            }
            
            if (!string.IsNullOrEmpty(filtroProdutoDto.Categoria))
            {
                filter &= Builders<Produto>.Filter.AnyEq(p => p.Categorias, filtroProdutoDto.Categoria);
            }

            if (!string.IsNullOrEmpty(filtroProdutoDto.Fornecedor))
            {
                filter &= Builders<Produto>.Filter.AnyEq(p => p.Fornecedores, filtroProdutoDto.Fornecedor);
            }

            return await _produtosCollection.Find(filter).SortBy(p => p.Nome).ToListAsync();
        }
    }
}