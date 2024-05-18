using stock_flow.Dtos;
using stock_flow.Models;
using stock_flow.Enums;

namespace stock_flow.Services
{
    public interface IMovimentacaoService
    {
        Task<Movimentacao> GetMovimentacaoByIdAsync(string id);
        Task<IEnumerable<Movimentacao>> GetMovimentacoesAsync();
        Task<Movimentacao> CreateMovimentacaoAsync(MovimentacaoDto movimentacaoDto);
        Task<Movimentacao> UpdateMovimentacaoAsync(string id, MovimentacaoDto movimentacaoDto);
        Task DeleteMovimentacaoAsync(string id);
        Task<IEnumerable<MovimentacaoAggregateDto>> GetMovimentacaoByFiltroAsync(FiltroMovimentacaoDto filtroMovimentacaoDto);
    }
}
