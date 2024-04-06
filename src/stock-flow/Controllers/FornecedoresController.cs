using Microsoft.AspNetCore.Mvc;
using stock_flow.Dtos;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using stock_flow.Configs;
using stock_flow.Models;
using stock_flow.Services;
using stock_flow.Controllers.Responses;
using stock_flow.Services.Impl;

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
        public async Task<ActionResult<List<FornecedorDto>>> GetAsync()
        {
            var fornecedores = await _fornecedorService.GetFornecedorAsync();
            return Ok(fornecedores);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FornecedorDto>> GetAsync(string id)
        {
            try
            {
                var fornecedor = await _fornecedorService.GetFornecedorByIdAsync(id);
                return Ok(fornecedor);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<FornecedorDto>> CreateAsync(FornecedorDto fornecedorDto)
        {
            try
            {
                var novoFornecedor = await _fornecedorService.CreateFornecedorAsync(fornecedorDto);
                return Ok(novoFornecedor);
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse { Message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<FornecedorDto>> UpdateAsync(string id, FornecedorDto fornecedorDto)
        {
            try
            {
                var fornecedorAtualizado = await _fornecedorService.UpdateFornecedorAsync(id, fornecedorDto);
                return Ok(fornecedorAtualizado);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
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
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }
    }
}
