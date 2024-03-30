﻿using Microsoft.AspNetCore.Mvc;
using stock_flow.Dtos;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using stock_flow.Configs;
using stock_flow.Models;
using stock_flow.Services;
using stock_flow.Controllers.Responses;

namespace stock_flow.Controllers
{
    [Route("api/v1/produtos")]
    [ApiController]
    public class ProdutosController : Controller
    {
        private readonly IProdutoService _produtoService;
        public ProdutosController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProdutoDto>>> GetAsync()
        {
            var model = await _produtoService.GetProdutosAsync();
            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoDto?>> GetAsync(string id)
        {
            try
            {
                var model = await _produtoService.GetProdutoByIdAsync(id);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }


        [HttpPost]
        public async Task<ActionResult> CreateAsync(ProdutoDto newProduct)
        {
            var model = await _produtoService.CreateProdutoAsync(newProduct);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(string id, ProdutoDto updatedProduct) 
        { 
            try
            {
                var model = await _produtoService.UpdateProdutoAsync(id, updatedProduct);
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
                await _produtoService.DeleteProdutoAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new BaseResponse { Message = ex.Message });
            }
        }

    }
}