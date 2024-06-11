using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services
{
    public interface IProdutoService
    {
        Task<Produto> GetProdutoByIdAsync(string id);
        Task<IEnumerable<Produto>> GetProdutosAsync();
        Task<List<Produto>> GetProdutosByFiltroAsync(FiltroProdutoDto filtroProdutoDto);
        Task<Produto> CreateProdutoAsync(ProdutoDto produtoDto);
        Task<Produto> UpdateProdutoAsync(string id, ProdutoDto produtoDto);
        Task<Produto> UpdateQuantidadeAsync(string id, int quantidade);
        Task DeleteProdutoAsync(string id);
        Task<IEnumerable<Fornecedor>> GetFornecedoresDoProdutoAsync(string id);
        Task RemoveFornecedorFromProdutosAsync(string id);
        Task<IEnumerable<Produto>> GetProdutosComQuantidadeZeroAsync();
        Task<List<string>> GetCategoriasAsync();
    }
}
