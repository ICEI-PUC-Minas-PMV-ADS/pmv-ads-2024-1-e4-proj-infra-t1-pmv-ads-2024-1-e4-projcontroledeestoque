using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services
{
    public interface IFornecedorService
    {
        Task<Fornecedor> GetFornecedorByIdAsync(string id);
        Task<IEnumerable<Fornecedor>> GetFornecedorAsync();
        Task<Fornecedor> CreateFornecedorAsync(FornecedorDto fornecedorDto);
        Task<Fornecedor> UpdateFornecedorAsync(string id, FornecedorDto fornecedorDto);
        Task DeleteFornecedorAsync(string id);
        Task<List<Fornecedor>> GetFornecedorsByFiltroAsync(FiltroFornecedorDto filtroFornecedorDto);
    }
}
