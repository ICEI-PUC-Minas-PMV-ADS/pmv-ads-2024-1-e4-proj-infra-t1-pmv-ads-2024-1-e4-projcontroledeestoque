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
        private readonly IMongoCollection<Fornecedor> _fornecedoresCollection;

        public ProdutoService(IOptions<ProdutosDatabaseSettings> produtosDatabaseSettings, IOptions<FornecedoresDatabaseSettings> fornecedoresDatabaseSettings)
        {
            var produtosConnectionString = produtosDatabaseSettings.Value.ConnectionString;
            var fornecedoresConnectionString = fornecedoresDatabaseSettings.Value.ConnectionString;

            var produtosClient = new MongoClient(produtosConnectionString);
            var fornecedoresClient = new MongoClient(fornecedoresConnectionString);

            var produtosDatabase = produtosClient.GetDatabase(produtosDatabaseSettings.Value.DatabaseName);
            var fornecedoresDatabase = fornecedoresClient.GetDatabase(fornecedoresDatabaseSettings.Value.DatabaseName);

            _produtosCollection = produtosDatabase.GetCollection<Produto>(produtosDatabaseSettings.Value.ProdutosCollectionName);
            _fornecedoresCollection = fornecedoresDatabase.GetCollection<Fornecedor>(fornecedoresDatabaseSettings.Value.FornecedoresCollectionName);

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

        public async Task<IEnumerable<FornecedorDto>> GetFornecedoresDoProdutoAsync(string produtoId)
        {
            var produto = await _produtosCollection.Find(x => x.Id == produtoId).FirstOrDefaultAsync();

            if (produto == null)
            {
                throw new Exception("Produto não encontrado");
            }

            var fornecedores = await _fornecedoresCollection.Find(f => produto.FornecedoresId.Contains(f.Id)).ToListAsync();

            return fornecedores.Select(fornecedor => new FornecedorDto
            {
                Nome = fornecedor.Nome,
                Endereco = fornecedor.Endereco,
                Contato = fornecedor.Contato
            });
        }
        public async Task<IEnumerable<ProdutoDto>> GetProdutosComQuantidadeZeroAsync()
        {
            var filter = Builders<Produto>.Filter.Eq(p => p.Quantidade, 0);
            var produtos = await _produtosCollection.Find(filter).ToListAsync();

            var produtosDto = new List<ProdutoDto>();
            foreach (var produto in produtos)
            {
                produtosDto.Add(new ProdutoDto
                {
                    Nome = produto.Nome,
                });
            }

            return produtosDto;
        }

    }
}
