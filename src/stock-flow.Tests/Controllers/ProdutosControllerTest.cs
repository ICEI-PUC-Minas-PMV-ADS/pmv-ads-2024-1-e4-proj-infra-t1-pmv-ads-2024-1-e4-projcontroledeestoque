using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using stock_flow.Controllers;
using stock_flow.Dtos;
using stock_flow.Models;
using stock_flow.Services;

namespace stock_flow.Tests.Controllers;

[TestFixture]
[TestOf(typeof(ProdutosController))]
public class ProdutosControllerTest
{
    private Mock<IProdutoService> _mockService;
    private ProdutosController _controller;

    [SetUp]
    public void Setup()
    {
        _mockService = new Mock<IProdutoService>();
        _controller = new ProdutosController(_mockService.Object);
    }

    [Test]
    public async Task GetProdutosByFiltroAsync_ReturnsOkResult_WhenProdutosExist()
    {
        _mockService.Setup(service => service.GetProdutosByFiltroAsync(It.IsAny<FiltroProdutoDto>()))
            .ReturnsAsync(new List<Produto> { new() });

        var result = await _controller.GetProdutosByFiltroAsync(new FiltroProdutoDto());

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetAsync_ReturnsOkResult_WhenProdutoExists()
    {
        _mockService.Setup(service => service.GetProdutoByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(new Produto());

        var result = await _controller.GetAsync("1");

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        _mockService.Setup(service => service.GetProdutoByIdAsync(It.IsAny<string>()))
            .Throws(new Exception());

        var result = await _controller.GetAsync("1");

        Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task CreateAsync_ReturnsOkResult_WhenProdutoIsCreated()
    {
        _mockService.Setup(service => service.CreateProdutoAsync(It.IsAny<ProdutoDto>()))
            .ReturnsAsync(new Produto());

        var result = await _controller.CreateAsync(new ProdutoDto());

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task UpdateAsync_ReturnsOkResult_WhenProdutoIsUpdated()
    {
        _mockService.Setup(service => service.UpdateProdutoAsync(It.IsAny<string>(), It.IsAny<ProdutoDto>()))
            .ReturnsAsync(new Produto());

        var result = await _controller.UpdateAsync("1", new ProdutoDto());

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task UpdateAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        _mockService.Setup(service => service.UpdateProdutoAsync(It.IsAny<string>(), It.IsAny<ProdutoDto>()))
            .Throws(new Exception());

        var result = await _controller.UpdateAsync("1", new ProdutoDto());

        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task RemoveAsync_ReturnsNoContent_WhenProdutoIsDeleted()
    {
        _mockService.Setup(service => service.DeleteProdutoAsync(It.IsAny<string>()))
            .Returns(Task.CompletedTask);

        var result = await _controller.RemoveAsync("1");

        Assert.That(result, Is.InstanceOf<NoContentResult>());
    }

    [Test]
    public async Task RemoveAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        _mockService.Setup(service => service.DeleteProdutoAsync(It.IsAny<string>()))
            .Throws(new Exception());

        var result = await _controller.RemoveAsync("1");

        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task GetFornecedoresDoProdutoAsync_ReturnsOkResult_WhenFornecedoresExist()
    {
        _mockService.Setup(service => service.GetFornecedoresDoProdutoAsync(It.IsAny<string>()))
            .ReturnsAsync(new List<Fornecedor> { new () });

        var result = await _controller.GetFornecedoresDoProdutoAsync("1");

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetFornecedoresDoProdutoAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        _mockService.Setup(service => service.GetFornecedoresDoProdutoAsync(It.IsAny<string>()))
            .Throws(new Exception());

        var result = await _controller.GetFornecedoresDoProdutoAsync("1");

        Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task GetProdutosComQuantidadeZero_ReturnsOkResult_WhenProdutosExist()
    {
        _mockService.Setup(service => service.GetProdutosComQuantidadeZeroAsync())
            .ReturnsAsync(new List<Produto> { new () });

        var result = await _controller.GetProdutosComQuantidadeZero();

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetCategorias_ReturnsOkResult_WhenCategoriasExist()
    {
        _mockService.Setup(service => service.GetCategoriasAsync())
            .ReturnsAsync(new List<string> { "Categoria1" });

        var result = await _controller.GetCategorias();

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }
}