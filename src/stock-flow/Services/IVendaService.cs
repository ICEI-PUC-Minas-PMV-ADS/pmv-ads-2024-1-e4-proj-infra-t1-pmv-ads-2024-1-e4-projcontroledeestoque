using stock_flow.Dtos;
using stock_flow.Models;

namespace stock_flow.Services
{
    public interface IVendaService
    {
        Task<Venda> GetVendaByIdAsync(string id);
        Task<Venda> GetVendaByUserAsync(string user);
        Task<Venda> GetVendaByProdutoAsync(string produto);
        Task<IEnumerable<Venda>> GetVendasAsync();
        Task<Venda> CreateVendaAsync(VendaDto vendaDto);
        Task<Venda> UpdateVendaAsync(string id, VendaDto vendaDto);
        Task DeleteVendaAsync(string id);
    }
}
