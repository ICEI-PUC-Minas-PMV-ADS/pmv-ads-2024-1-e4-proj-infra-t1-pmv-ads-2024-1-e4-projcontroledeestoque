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
[TestOf(typeof(RelatoriosController))]
public class RelatoriosControllerTest
{
    private Mock<IMovimentacaoService> _mockService;
    private RelatoriosController _controller;

    [SetUp]
    public void Setup()
    {
        _mockService = new Mock<IMovimentacaoService>();
        _controller = new RelatoriosController(_mockService.Object);
    }

    [Test]
    public async Task GetMovimentacoes_ReturnsOkResult_WhenMovimentacoesExist()
    {
        _mockService.Setup(service => service.GetMovimentacaoByFiltroAsync(It.IsAny<FiltroMovimentacaoDto>()))
            .ReturnsAsync(new List<Movimentacao> { new() });

        var result = await _controller.GetMovimentacoes(new FiltroMovimentacaoDto());

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public void GetEstoque_ReturnsOkResult()
    {
        var result = _controller.GetEstoque();

        Assert.That(result, Is.InstanceOf<OkResult>());
    }
}