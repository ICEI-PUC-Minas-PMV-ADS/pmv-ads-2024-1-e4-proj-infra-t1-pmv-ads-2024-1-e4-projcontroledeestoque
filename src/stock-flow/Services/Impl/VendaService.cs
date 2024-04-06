using Microsoft.Extensions.Options;
using MongoDB.Driver;
using stock_flow.Configs;
using stock_flow.Dtos;
using stock_flow.Models;
using static System.Net.Mime.MediaTypeNames;

namespace stock_flow.Services.Impl
{
    public class VendaService : IVendaService
    {
        private readonly IMongoCollection<Venda> _vendasCollection;

        public VendaService(IOptions<VendasDatabaseSettings> vendasDatabaseSettings)
        {
            var mongoClient = new MongoClient(vendasDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(vendasDatabaseSettings.Value.DatabaseName);

            _vendasCollection = mongoDatabase.GetCollection<Venda>(vendasDatabaseSettings.Value.VendasCollectionName);
        }

        public async Task<Venda> CreateVendaAsync(VendaDto vendaDto)
        {
            var venda = new Venda
            {
                Id = vendaDto.Id,
                User = vendaDto.User,
                Produto = vendaDto.Produto,
                Categorias = vendaDto.Categorias,
                ValorVenda = vendaDto.ValorVenda,
                Quantidade = vendaDto.Quantidade,
                Imagem = vendaDto.Imagem,
                
            };

            await _vendasCollection.InsertOneAsync(venda);
            return venda;
        }

        public async Task DeleteVendaAsync(string id)
        {
            _ = await _vendasCollection.DeleteOneAsync(x => x.Id == id) ??
                throw new Exception("Produto não encontrado");
        }

        public async Task<Venda> GetVendaByIdAsync(string id)
        {
            return await _vendasCollection.Find(x => x.Id == id).FirstOrDefaultAsync() ??
                throw new Exception("Produto não encontrado");
        }

        public async Task<Venda> GetVendaByProdutoAsync(string produto)
        {
            return await _vendasCollection.Find(x => x.Produto == produto).FirstOrDefaultAsync() ??
                throw new Exception("Produto não encontrado");
        }

        public async Task<Venda> GetVendaByUserAsync(string user)
        {
            return await _vendasCollection.Find(x => x.User == user).FirstOrDefaultAsync() ??
                throw new Exception("Produto não encontrado");
        }

        public async Task<IEnumerable<Venda>> GetVendasAsync()
        {
            return await _vendasCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Venda> UpdateVendaAsync(string id, VendaDto vendaDto)
        {
            var venda = await GetVendaByIdAsync(id);

            venda.Id = vendaDto.Id;
            venda.User = vendaDto.User;
            venda.Produto = vendaDto.Produto;
            venda.Categorias = vendaDto.Categorias;
            venda.ValorVenda = vendaDto.ValorVenda;
            venda.Quantidade = vendaDto.Quantidade;
            venda.Imagem = vendaDto.Imagem;

            await _vendasCollection.ReplaceOneAsync(x => x.Id == id, venda);
            return venda;
        }
    }
}
