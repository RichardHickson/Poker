using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using PokerLedger.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:5174", "https://ambitious-forest-0e1870710.3.azurestaticapps.net");
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setupAction: swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "PokerLedger API", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API to store poker games.");
    swaggerUIOptions.RoutePrefix = string.Empty;
}); ;

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/get-all-games", async () => await GamesRepository.GetGames())
    .WithTags("Games Endpoints");


app.MapPost("/create-game", async (Game gameToCreate) =>await GamesRepository.CreateGame(gameToCreate))
    .WithTags("Games Endpoints");

app.MapGet("/get-all-users", async () => await UserRepository.GetUsers())
    .WithTags("Users Endpoints");


app.MapPost("/create-user", async (User userToCreate) => await UserRepository.CreateUser(userToCreate))
    .WithTags("Users Endpoints");

app.MapPost("/get-user", async (string username) => await UserRepository.GetUserByUsername(username))
    .WithTags("Users Endpoints");


app.Run();