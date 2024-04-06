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
    public class VendasController : Controller
    {
        private readonly IVendaService _vendaService;

        public VendasController (IVendaService vendaService)
        {
            _vendaService = vendaService;
        }




        [HttpGet]
        public async Task<ActionResult<List<VendaDto>>> GetAsync()
        {
            var model = await _vendaService.GetVendasAsync();
            return Ok(model);
        }

        [HttpGet]
        public async Task<ActionResult<VendaDto?>> GetIdAsync(string id)
        {
            try
            {
                var model = await _vendaService.GetVendaByIdAsync(id);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }
        [HttpGet]
        public async Task<ActionResult<VendaDto?>> GetUserAsync(string user)
        {
            try
            {
                var model = await _vendaService.GetVendaByUserAsync(user);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<VendaDto?>> GetProdutoAsync(string produto)
        {
            try
            {
                var model = await _vendaService.GetVendaByUserAsync(produto);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateAsync(VendaDto newVenda)
        {
            var model = await _vendaService.CreateVendaAsync(newVenda);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(string id, VendaDto updateVenda)
        {
            try
            {
                var model = await _vendaService.UpdateVendaAsync(id, updateVenda);
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
                await _vendaService.DeleteVendaAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }
    }
}
