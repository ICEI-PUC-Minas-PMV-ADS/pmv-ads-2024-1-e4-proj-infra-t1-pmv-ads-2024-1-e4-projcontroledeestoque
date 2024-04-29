using Microsoft.Extensions.Options;
using MongoDB.Driver;
using stock_flow.Configs;
using stock_flow.Dtos;
using stock_flow.Enums;
using stock_flow.Models;

namespace stock_flow.Services.Impl
{
    public class MovimentacaoService : IMovimentacaoService
    {
        private readonly IMongoCollection<Movimentacao> _movimentacoesCollection;
        private readonly IProdutoService _produtoService;
        private readonly IAuthService _usuarioService;

        public MovimentacaoService(
            IOptions<MovimentacoesDatabaseSettings> movimentacoesDatabaseSettings, 
            IProdutoService produtoService,
            IAuthService usuarioService)
        {
            var movimentacoesConnectionString = movimentacoesDatabaseSettings.Value.ConnectionString;

            var movimentacoesClient = new MongoClient(movimentacoesConnectionString);

            var movimentacoesDatabase = movimentacoesClient.GetDatabase(movimentacoesDatabaseSettings.Value.DatabaseName);

            _movimentacoesCollection = movimentacoesDatabase.GetCollection<Movimentacao>(movimentacoesDatabaseSettings.Value.MovimentacoesCollectionName);

            _produtoService = produtoService;
            _usuarioService = usuarioService;
        }

        public async Task<Movimentacao> CreateMovimentacaoAsync(MovimentacaoDto movimentacaoDto)
        {
            await _produtoService.GetProdutoByIdAsync(movimentacaoDto.Produto);
            await _usuarioService.GetUserByIdAsync(movimentacaoDto.Usuario);

            if (Enum.TryParse(movimentacaoDto.Tipo, out TipoMovimentacao tipoMovimentacao) == false)
            {
                throw new Exception("Tipo de movimentação inválido");
            }

            var quantidade = movimentacaoDto.Quantidade;

            if (quantidade <= 0)
            {
                throw new Exception("Quantidade inválida");
            }
            
            if (tipoMovimentacao == TipoMovimentacao.Venda)
            {
                quantidade *= -1;
            }

            await _produtoService.UpdateQuantidadeAsync(movimentacaoDto.Produto, quantidade);

            var movimentacao = new Movimentacao
            {
                Produto = movimentacaoDto.Produto,
                Usuario = movimentacaoDto.Usuario,
                Quantidade = movimentacaoDto.Quantidade,
                Valor = movimentacaoDto.Valor,
                Tipo = movimentacaoDto.Tipo,
                Data = movimentacaoDto.Data
            };

            await _movimentacoesCollection.InsertOneAsync(movimentacao);
            return movimentacao;
        }

        public async Task DeleteMovimentacaoAsync(string id)
        {
            _ = await _movimentacoesCollection.DeleteOneAsync(x => x.Id == id) ??
                throw new Exception("Movimentação não encontrado");
        }

        public async Task<Movimentacao> GetMovimentacaoByIdAsync(string id)
        {
            return await _movimentacoesCollection.Find(x => x.Id == id).FirstOrDefaultAsync() ??
                throw new Exception("Movimentação não encontrada");
        }

        public async Task<IEnumerable<Movimentacao>> GetMovimentacoesAsync()
        {
            return await _movimentacoesCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Movimentacao> UpdateMovimentacaoAsync(string id, MovimentacaoDto movimentacaoDto)
        {
            var movimentacao = await GetMovimentacaoByIdAsync(id);

            await _produtoService.GetProdutoByIdAsync(movimentacaoDto.Produto);
            await _usuarioService.GetUserByIdAsync(movimentacaoDto.Usuario);

            movimentacao.Produto = movimentacaoDto.Produto;
            movimentacao.Usuario = movimentacaoDto.Usuario;
            movimentacao.Quantidade = movimentacaoDto.Quantidade;
            movimentacao.Valor = movimentacaoDto.Valor;
            movimentacao.Tipo = movimentacaoDto.Tipo;
            movimentacao.Data = movimentacaoDto.Data;

            await _movimentacoesCollection.ReplaceOneAsync(x => x.Id == id, movimentacao);
            return movimentacao;
        }

        public async Task<IEnumerable<Movimentacao>> GetMovimentacaoByFiltroAsync(FiltroMovimentacaoDto filtroMovimentacaoDto)
        {
            var filtro = Builders<Movimentacao>.Filter.Empty;

            if (DateTime.TryParse(filtroMovimentacaoDto.DataInicio, out DateTime dataInicio))
            {
                filtro &= Builders<Movimentacao>.Filter.Gte(x => x.Data, dataInicio);
            }

            if (DateTime.TryParse(filtroMovimentacaoDto.DataFim, out DateTime dataFim))
            {
                filtro &= Builders<Movimentacao>.Filter.Lte(x => x.Data, dataFim);
            }

            if (filtroMovimentacaoDto.TipoMovimentacao != null)
            {
                filtro &= Builders<Movimentacao>.Filter.Eq(x => x.Tipo, filtroMovimentacaoDto.TipoMovimentacao);
            }

            if (filtroMovimentacaoDto.Produto != null)
            {
                filtro &= Builders<Movimentacao>.Filter.Eq(x => x.Produto, filtroMovimentacaoDto.Produto);
            }

            if (filtroMovimentacaoDto.Usuario != null)
            {
                filtro &= Builders<Movimentacao>.Filter.Eq(x => x.Usuario, filtroMovimentacaoDto.Usuario);
            }

            if (int.TryParse(filtroMovimentacaoDto.Quantidade, out int quantidade))
            {
                filtro &= Builders<Movimentacao>.Filter.Gte(x => x.Quantidade, quantidade);
            }

            if (int.TryParse(filtroMovimentacaoDto.QuantidadeMinima, out int quantidadeMinima))
            {
                filtro &= Builders<Movimentacao>.Filter.Gte(x => x.Quantidade, quantidadeMinima);
            }
            
            if (int.TryParse(filtroMovimentacaoDto.QuantidadeMaxima, out int quantidadeMaxima))
            {
                filtro &= Builders<Movimentacao>.Filter.Lte(x => x.Quantidade, quantidadeMaxima);
            }

            if (decimal.TryParse(filtroMovimentacaoDto.Valor, out decimal valor))
            {
                filtro &= Builders<Movimentacao>.Filter.Gte(x => x.Valor, valor);
            }
            
            if (decimal.TryParse(filtroMovimentacaoDto.ValorMinimo, out decimal valorMinimo))
            {
                filtro &= Builders<Movimentacao>.Filter.Gte(x => x.Valor, valorMinimo);
            }
            
            if (decimal.TryParse(filtroMovimentacaoDto.ValorMaximo, out decimal valorMaximo))
            {
                filtro &= Builders<Movimentacao>.Filter.Lte(x => x.Valor, valorMaximo);
            }

            return await _movimentacoesCollection.Find(filtro).ToListAsync();
        }
    }
}