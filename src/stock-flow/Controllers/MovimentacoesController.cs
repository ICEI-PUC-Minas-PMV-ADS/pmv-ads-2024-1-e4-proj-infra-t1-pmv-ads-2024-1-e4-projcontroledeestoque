using Microsoft.AspNetCore.Mvc;
using stock_flow.Controllers.Responses;
using stock_flow.Dtos;
using stock_flow.Models;
using stock_flow.Services;

namespace stock_flow.Controllers
{

    [Route("api/v1/movimentacoes")]
    [ApiController]
    public class MovimentacoesController : Controller
    {
        private readonly IMovimentacaoService _movimentacaoService;

        public MovimentacoesController(IMovimentacaoService movimentacaoService)
        {
            _movimentacaoService = movimentacaoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Movimentacao>>> GetAsync()
        {
            var model = await _movimentacaoService.GetMovimentacoesAsync();
            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movimentacao>> GetAsync(string id)
        {
            try
            {
                var model = await _movimentacaoService.GetMovimentacaoByIdAsync(id);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Mensagem = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateAsync(MovimentacaoDto newMovimentacao)
        {
            try
            {
                var model = await _movimentacaoService.CreateMovimentacaoAsync(newMovimentacao);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse { Mensagem = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(string id, MovimentacaoDto updatedMovimentacao)
        {
            try
            {
                var model = await _movimentacaoService.UpdateMovimentacaoAsync(id, updatedMovimentacao);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Mensagem = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(string id)
        {
            try
            {
                await _movimentacaoService.DeleteMovimentacaoAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Mensagem = ex.Message });
            }
        }
    }
}
