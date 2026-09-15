using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);

// Configura o CORS para permitir requisições da aplicação
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Serve os arquivos da pasta 'front' (HTML, CSS, JS e Imagens)
var rootPath = builder.Environment.ContentRootPath;
var frontPath = Path.Combine(rootPath, "..", "front"); // Acessa a pasta 'front' que está ao lado da pasta 'back'

if (Directory.Exists(frontPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(frontPath),
        RequestPath = ""
    });
}

// Dados de teste para o login
List<Cliente> clientes = new List<Cliente>
{
    new Cliente("Cliente FordCoin", "123", "123")
};

// Endpoint da API de Login (POST /api/login)
app.MapPost("/api/login", (LoginRequest request) =>
{
    var cliente = clientes.Find(c => c.CPF == request.Cpf);

    if (cliente != null && cliente.Autenticar(request.Cpf, request.Senha))
    {
        return Results.Ok(new { sucesso = true, mensagem = "Sucesso!", nome = cliente.Nome });
    }

    return Results.BadRequest(new { sucesso = false, mensagem = "CPF ou Senha inválidos!" });
});

app.Run();

// DTO para mapear o JSON enviado pelo JS
record LoginRequest(string Cpf, string Senha);