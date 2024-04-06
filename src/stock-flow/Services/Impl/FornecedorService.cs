﻿using Microsoft.Extensions.Options;
using MongoDB.Driver;
using stock_flow.Configs;
using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services.Impl
{
    public class FornecedorService : IFornecedorService
    {
        private readonly IMongoCollection<Fornecedor> _fornecedoresCollection;

        public FornecedorService(IOptions<FornecedoresDatabaseSettings> fornecedoresDatabaseSettings)
        {
            var mongoClient = new MongoClient(fornecedoresDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(fornecedoresDatabaseSettings.Value.DatabaseName);

            _fornecedoresCollection = mongoDatabase.GetCollection<Fornecedor>(fornecedoresDatabaseSettings.Value.FornecedoresCollectionName);
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
    }
}