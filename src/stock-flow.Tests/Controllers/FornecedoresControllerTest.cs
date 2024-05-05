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
[TestOf(typeof(FornecedoresController))]
public class FornecedoresControllerTest
{
    private Mock<IFornecedorService> _mockService;
    private FornecedoresController _controller;

    [SetUp]
    public void SetUp()
    {
        _mockService = new Mock<IFornecedorService>();
        _controller = new FornecedoresController(_mockService.Object);
    }
    
    [Test]
    public async Task GetFornecedorsByFiltroAsync_ReturnsOkResult_WhenFornecedorsExist()
    {
        // Arrange
        _mockService.Setup(service => service.GetFornecedorsByFiltroAsync(It.IsAny<FiltroFornecedorDto>()))
            .ReturnsAsync(new List<Fornecedor> { new() });

        // Act
        var result = await _controller.GetFornecedorsByFiltroAsync(new FiltroFornecedorDto());

        // Assert
        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetFornecedorsByFiltroAsync_ReturnsServerError_WhenExceptionIsThrown()
    {
        // Arrange
        _mockService.Setup(service => service.GetFornecedorsByFiltroAsync(It.IsAny<FiltroFornecedorDto>()))
            .Throws(new Exception());

        // Act
        var result = await _controller.GetFornecedorsByFiltroAsync(new FiltroFornecedorDto());

        // Assert
        Assert.That(result.Result, Is.InstanceOf<ObjectResult>());
        Assert.That(500, Is.EqualTo(result.Result?.GetType().GetProperty("StatusCode")?.GetValue(result.Result)));
    }

    [Test]
    public async Task GetAsync_ReturnsOkResult_WhenFornecedorExists()
    {
        // Arrange
        _mockService.Setup(service => service.GetFornecedorByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(new Fornecedor());

        // Act
        var result = await _controller.GetAsync("1");

        // Assert
        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        // Arrange
        _mockService.Setup(service => service.GetFornecedorByIdAsync(It.IsAny<string>()))
            .Throws(new Exception());

        // Act
        var result = await _controller.GetAsync("1");

        // Assert
        Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
    }
    
    [Test]
    public async Task CreateAsync_ReturnsOkResult_WhenFornecedorIsCreated()
    {
        // Arrange
        _mockService.Setup(service => service.CreateFornecedorAsync(It.IsAny<FornecedorDto>()))
            .ReturnsAsync(new Fornecedor());

        // Act
        var result = await _controller.CreateAsync(new FornecedorDto());

        // Assert
        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task CreateAsync_ReturnsBadRequest_WhenExceptionIsThrown()
    {
        // Arrange
        _mockService.Setup(service => service.CreateFornecedorAsync(It.IsAny<FornecedorDto>()))
            .Throws(new Exception());

        // Act
        var result = await _controller.CreateAsync(new FornecedorDto());

        // Assert
        Assert.That(result.Result, Is.InstanceOf<BadRequestObjectResult>());
        Assert.That(400, Is.EqualTo(result.Result?.GetType().GetProperty("StatusCode")?.GetValue(result.Result)));
    }

    [Test]
    public async Task UpdateAsync_ReturnsOkResult_WhenFornecedorIsUpdated()
    {
        // Arrange
        _mockService.Setup(service => service.UpdateFornecedorAsync(It.IsAny<string>(), It.IsAny<FornecedorDto>()))
            .ReturnsAsync(new Fornecedor());

        // Act
        var result = await _controller.UpdateAsync("1", new FornecedorDto());

        // Assert
        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task UpdateAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        // Arrange
        _mockService.Setup(service => service.UpdateFornecedorAsync(It.IsAny<string>(), It.IsAny<FornecedorDto>()))
            .Throws(new Exception());

        // Act
        var result = await _controller.UpdateAsync("1", new FornecedorDto());

        // Assert
        Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
    }
    
    [Test]
    public async Task DeleteAsync_ReturnsNoContent_WhenFornecedorIsDeleted()
    {
        // Arrange
        _mockService.Setup(service => service.DeleteFornecedorAsync(It.IsAny<string>()))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _controller.DeleteAsync("1");

        // Assert
        Assert.That(result, Is.InstanceOf<NoContentResult>());
    }

    [Test]
    public async Task DeleteAsync_ReturnsNotFound_WhenExceptionIsThrown()
    {
        // Arrange
        _mockService.Setup(service => service.DeleteFornecedorAsync(It.IsAny<string>()))
            .Throws(new Exception());

        // Act
        var result = await _controller.DeleteAsync("1");

        // Assert
        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }
}