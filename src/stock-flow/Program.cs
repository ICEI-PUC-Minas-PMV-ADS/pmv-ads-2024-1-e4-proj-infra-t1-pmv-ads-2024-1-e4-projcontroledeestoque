using System.Text;
using System.Text.Json.Serialization;
using AspNetCore.Identity.MongoDbCore.Extensions;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using stock_flow.Configs;
using stock_flow.Models;
using stock_flow.Services;
using stock_flow.Services.Impl;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();


// Add services to the container.
BsonSerializer.RegisterSerializer(new GuidSerializer(BsonType.String));
BsonSerializer.RegisterSerializer(new DateTimeSerializer(BsonType.String));
BsonSerializer.RegisterSerializer(new DateTimeOffsetSerializer(BsonType.String));

// Add MongoDB identity configuration
var mongoDbIdentityConfig = new MongoDbIdentityConfiguration
{
    MongoDbSettings = new MongoDbSettings
    {
        ConnectionString = builder.Configuration["MongoDbSettings:ConnectionString"],
        DatabaseName = builder.Configuration["MongoDbSettings:DatabaseName"]
    },
    IdentityOptionsAction = options =>
    {
        // Password settings
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 8;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = true;

        // Lockout settings
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        // User settings
        options.User.RequireUniqueEmail = true;
    }
};

builder.Services.ConfigureMongoDbIdentity<ApplicationUser, ApplicationRole, Guid>(mongoDbIdentityConfig)
    .AddUserManager<UserManager<ApplicationUser>>()
    .AddSignInManager<SignInManager<ApplicationUser>>()
    .AddRoleManager<RoleManager<ApplicationRole>>()
    .AddDefaultTokenProviders();

builder.Services.ConfigureMongoDbIdentity<ApplicationUser, ApplicationRole, Guid>(mongoDbIdentityConfig)
    .AddUserManager<UserManager<ApplicationUser>>()
    .AddSignInManager<SignInManager<ApplicationUser>>()
    .AddRoleManager<RoleManager<ApplicationRole>>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidAudience = "https://localhost:5001",
        ValidIssuer = "https://localhost:5001",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("MIICXQIBAAKBgQDgjWqdGP6wgDk04hOMnEEq/ZDwMi9RyfOqTRj60gwwsQtQJrWt")),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddControllers().AddJsonOptions(options =>
{ 
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Services configuration
builder.Services.Configure<TestDatabaseSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.Configure<ProdutosDatabaseSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.Configure<FornecedoresDatabaseSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.Configure<MovimentacoesDatabaseSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();
builder.Services.AddScoped<IFornecedorService, FornecedorService>();
builder.Services.AddScoped<IMovimentacaoService, MovimentacaoService>();

// Add Lazy<T> registrations
builder.Services.AddTransient(provider => new Lazy<IProdutoService>(() => provider.GetService<IProdutoService>()));
builder.Services.AddTransient(provider => new Lazy<IFornecedorService>(() => provider.GetService<IFornecedorService>()));
builder.Services.AddTransient(provider => new Lazy<IMovimentacaoService>(() => provider.GetService<IMovimentacaoService>()));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "stock_flow v1"));

app.UseHttpsRedirection();

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
