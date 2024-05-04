using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Moq;
using NUnit.Framework;
using stock_flow.Exceptions;
using stock_flow.Models;
using stock_flow.Services.Impl;

[TestFixture]
public class AuthServiceTests
{
    private Mock<UserManager<ApplicationUser>> _mockUserManager;
    private Mock<RoleManager<ApplicationRole>> _mockRoleManager;
    private AuthService _service;

    [SetUp]
    public void SetUp()
    {
        var userStoreMock = new Mock<IUserStore<ApplicationUser>>();
        _mockUserManager = new Mock<UserManager<ApplicationUser>>(userStoreMock.Object, null, null, null, null, null, null, null, null);

        var roleStoreMock = new Mock<IRoleStore<ApplicationRole>>();
        _mockRoleManager = new Mock<RoleManager<ApplicationRole>>(roleStoreMock.Object, null, null, null, null);

        _service = new AuthService(_mockUserManager.Object, _mockRoleManager.Object);
    }

    [Test]
    public async Task RegisterAsync_ShouldThrowAuthException_WhenUserAlreadyExists()
    {
        // Arrange
        var user = new ApplicationUser { Email = "test@test.com" };
        _mockUserManager.Setup(um => um.FindByEmailAsync(user.Email)).ReturnsAsync(user);

        // Act & Assert
        Assert.ThrowsAsync<AuthException>(() => _service.RegisterAsync(user, "password"));
    }

    [Test]
    public async Task RegisterAsync_ShouldThrowAuthException_WhenUserCreationFails()
    {
        // Arrange
        var user = new ApplicationUser { Email = "test@test.com" };
        _mockUserManager.Setup(um => um.FindByEmailAsync(user.Email)).ReturnsAsync((ApplicationUser)null);
        _mockUserManager.Setup(um => um.CreateAsync(user, "password")).ReturnsAsync(IdentityResult.Failed());

        // Act & Assert
        Assert.ThrowsAsync<AuthException>(() => _service.RegisterAsync(user, "password"));
    }

    [Test]
    public async Task RegisterAsync_ShouldCreateUser_WhenUserDoesNotExist()
    {
        // Arrange
        var user = new ApplicationUser { Email = "test@test.com" };
        _mockUserManager.Setup(um => um.FindByEmailAsync(user.Email)).ReturnsAsync((ApplicationUser)null);
        _mockUserManager.Setup(um => um.CreateAsync(user, "password")).ReturnsAsync(IdentityResult.Success);

        // Act
        await _service.RegisterAsync(user, "password");

        // Assert
        _mockUserManager.Verify(um => um.CreateAsync(user, "password"), Times.Once);
    }
}