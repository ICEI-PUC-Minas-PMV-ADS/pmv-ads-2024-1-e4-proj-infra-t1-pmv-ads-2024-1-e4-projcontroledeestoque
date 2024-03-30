using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services
{
    public interface IProdutoService
    {
        Task<Produto> GetProdutoByIdAsync(string id);
        Task<IEnumerable<Produto>> GetProdutosAsync();
        Task<Produto> CreateProdutoAsync(ProdutoDto produtoDto);
        Task<Produto> UpdateProdutoAsync(string id, ProdutoDto produtoDto);
        Task DeleteProdutoAsync(string id);
    }
}
