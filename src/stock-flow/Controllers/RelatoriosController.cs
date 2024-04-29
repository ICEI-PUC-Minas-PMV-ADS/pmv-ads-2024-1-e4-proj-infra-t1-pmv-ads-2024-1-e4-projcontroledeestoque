using Microsoft.AspNetCore.Mvc;
using stock_flow.Dtos;
using stock_flow.Models;
using stock_flow.Services;
// using Microsoft.AspNetCore.Cors;

namespace stock_flow.Controllers
{

    [Route("api/v1/relatorios")]
    // [EnableCors("MyAllowSpecificOrigins")]
    [ApiController]
    public class RelatoriosController : Controller
    {
        private readonly IMovimentacaoService _movimentacaoService;

        public RelatoriosController(IMovimentacaoService movimentacaoService)
        {
            _movimentacaoService = movimentacaoService;
        }

        [HttpGet("movimentacoes")]
        public async Task<ActionResult<List<Movimentacao>>> GetMovimentacoes([FromQuery] FiltroMovimentacaoDto filtroMovimentacaoDto)
        {
            var model = await _movimentacaoService.GetMovimentacaoByFiltroAsync(filtroMovimentacaoDto);
            return Ok(model);
        }

        [HttpGet("estoque")]
        public IActionResult GetEstoque()
        {
            return Ok();
        }
    }
}
