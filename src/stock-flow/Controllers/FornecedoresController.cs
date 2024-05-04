using Microsoft.AspNetCore.Mvc;
using stock_flow.Controllers.Responses;
using stock_flow.Dtos;
using stock_flow.Models;
using stock_flow.Services;

namespace stock_flow.Controllers
{
    [Route("api/v1/fornecedores")]
    [ApiController]
    public class FornecedoresController : ControllerBase
    {
        private readonly IFornecedorService _fornecedorService;
        public FornecedoresController(IFornecedorService fornecedorService)
        {
            _fornecedorService = fornecedorService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Fornecedor>>> GetFornecedorsByFiltroAsync([FromQuery] FiltroFornecedorDto filtroFornecedorDto)
        {
            try
            {
                var fornecedores = await _fornecedorService.GetFornecedorsByFiltroAsync(filtroFornecedorDto);
                return Ok(fornecedores);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new BaseResponse { Mensagem = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fornecedor>> GetAsync(string id)
        {
            try
            {
                var fornecedor = await _fornecedorService.GetFornecedorByIdAsync(id);
                return Ok(fornecedor);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Mensagem = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Fornecedor>> CreateAsync(FornecedorDto fornecedorDto)
        {
            try
            {
                var novoFornecedor = await _fornecedorService.CreateFornecedorAsync(fornecedorDto);
                return Ok(novoFornecedor);
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse { Mensagem = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Fornecedor>> UpdateAsync(string id, FornecedorDto fornecedorDto)
        {
            try
            {
                var fornecedorAtualizado = await _fornecedorService.UpdateFornecedorAsync(id, fornecedorDto);
                return Ok(fornecedorAtualizado);
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
                await _fornecedorService.DeleteFornecedorAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Mensagem = ex.Message });
            }
        }
    }
}
