using Microsoft.AspNetCore.Mvc;
using stock_flow.Controllers.Responses;
using stock_flow.Dtos;
using stock_flow.Services;
using stock_flow.Services.Impl;

namespace stock_flow.Controllers
{
    public class ComprasController : Controller
    {
        private readonly ICompraService _compraService;

        public ComprasController(ICompraService compraService)
        {
            _compraService = compraService;
        }




        [HttpGet]
        public async Task<ActionResult<List<CompraDto>>> GetAsync()
        {
            var model = await _compraService.GetCompraAsync();
            return Ok(model);
        }

        [HttpGet]
        public async Task<ActionResult<CompraDto?>> GetIdAsync(string id)
        {
            try
            {
                var model = await _compraService.GetCompraByIdAsync(id);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<CompraDto?>> GetProdutoAsync(string produto)
        {
            try
            {
                var model = await _compraService.GetCompraByProdutoAsync(produto);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }

        public async Task<ActionResult> CreateAsync(CompraDto newCompra)
        {
            var model = await _compraService.CreateCompraAsync(newCompra);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(string id, CompraDto updateCompra)
        {
            try
            {
                var model = await _compraService.UpdateCompraAsync(id, updateCompra);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveAsync(string id)
        {
            try
            {
                await _compraService.DeleteCompraAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }
    }
}
