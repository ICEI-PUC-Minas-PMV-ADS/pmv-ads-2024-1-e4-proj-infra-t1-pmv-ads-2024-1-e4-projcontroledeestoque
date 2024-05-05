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
[TestOf(typeof(MovimentacoesController))]
public class MovimentacoesControllerTest
{
    private MovimentacoesController _controller;
    private Mock<IMovimentacaoService> _mockService;

    [SetUp]
    public void Setup()
    {
        _mockService = new Mock<IMovimentacaoService>();
        _controller = new MovimentacoesController(_mockService.Object);
    }

    [Test]
    public async Task GetAsync_ReturnsOkResult_WhenMovimentacoesExist()
    {
        _mockService.Setup(service => service.GetMovimentacoesAsync())
            .ReturnsAsync(new List<Movimentacao> { new Movimentacao() });

        var result = await _controller.GetAsync();

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetAsync_ById_ReturnsOkResult_WhenMovimentacaoExists()
    {
        _mockService.Setup(service => service.GetMovimentacaoByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(new Movimentacao());

        var result = await _controller.GetAsync("1");

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetAsync_ById_ReturnsNotFound_WhenExceptionIsThrown()
    {
        _mockService.Setup(service => service.GetMovimentacaoByIdAsync(It.IsAny<string>()))
            .Throws(new Exception());

        var result = await _controller.GetAsync("1");

        Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task CreateAsync_ReturnsOkResult_WhenMovimentacaoIsCreated()
    {
        _mockService.Setup(service => service.CreateMovimentacaoAsync(It.IsAny<MovimentacaoDto>()))
            .ReturnsAsync(new Movimentacao());

        var result = await _controller.CreateAsync(new MovimentacaoDto());

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task CreateAsync_ReturnsBadRequest_WhenExceptionIsThrown()
    {
        _mockService.Setup(service => service.CreateMovimentacaoAsync(It.IsAny<MovimentacaoDto>()))
            .Throws(new Exception());

        var result = await _controller.CreateAsync(new MovimentacaoDto());

        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public async Task UpdateAsync_ReturnsOkResult_WhenMovimentacaoIsUpdated()
    {
        _mockService.Setup(service => service.UpdateMovimentacaoAsync(It.IsAny<string>(), It.IsAny<MovimentacaoDto>()))
            .ReturnsAsync(new Movimentacao());

        var result = await _controller.UpdateAsync("1", new MovimentacaoDto());

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task UpdateAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        _mockService.Setup(service => service.UpdateMovimentacaoAsync(It.IsAny<string>(), It.IsAny<MovimentacaoDto>()))
            .Throws(new Exception());

        var result = await _controller.UpdateAsync("1", new MovimentacaoDto());

        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task DeleteAsync_ReturnsOk_WhenMovimentacaoIsDeleted()
    {
        _mockService.Setup(service => service.DeleteMovimentacaoAsync(It.IsAny<string>()))
            .Returns(Task.CompletedTask);

        var result = await _controller.DeleteAsync("1");

        Assert.That(result, Is.InstanceOf<OkResult>());
    }

    [Test]
    public async Task DeleteAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        _mockService.Setup(service => service.DeleteMovimentacaoAsync(It.IsAny<string>()))
            .Throws(new Exception());

        var result = await _controller.DeleteAsync("1");

        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }
}