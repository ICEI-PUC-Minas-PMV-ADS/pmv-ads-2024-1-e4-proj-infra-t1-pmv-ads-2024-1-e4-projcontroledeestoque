using Microsoft.AspNetCore.Mvc;
using stock_flow.Dtos;
using stock_flow.Models;
using stock_flow.Services;
using stock_flow.Services.Impl;

namespace stock_flow.Controllers
{

    [Route("api/v1/relatorios")]
    [ApiController]
    public class RelatoriosController : Controller
    {
        private readonly IMovimentacaoService _movimentacaoService;

        public RelatoriosController(IMovimentacaoService movimentacaoService)
        {
            _movimentacaoService = movimentacaoService;
        }

        [HttpGet("movimentacoes")]
        public async Task<ActionResult<List<Movimentacao>>> GetMovimentacoes([FromQuery] FiltroDto filtroDto)
        {
            var model = await _movimentacaoService.GetMovimentacaoByFiltroAsync(filtroDto);
            return Ok(model);
        }

        [HttpGet("estoque")]
        public IActionResult GetEstoque()
        {
            return Ok();
        }
    }
}
