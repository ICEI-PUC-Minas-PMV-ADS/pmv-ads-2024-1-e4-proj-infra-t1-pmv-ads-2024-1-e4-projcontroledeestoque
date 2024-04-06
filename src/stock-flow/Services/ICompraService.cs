using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services
{
    public interface ICompraService
    {
        Task<Compra> GetCompraByIdAsync(string id);
        Task<Compra> GetCompraByProdutoAsync(string produto);
        Task<IEnumerable<Compra>> GetCompraAsync();
        Task<Compra> CreateCompraAsync(CompraDto compraDto);
        Task<Compra> UpdateCompraAsync(string id, CompraDto compraDto);
        Task DeleteCompraAsync(string id);
    }
}
