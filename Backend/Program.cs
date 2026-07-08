using WeatherApi.Application.Abstractions;
using WeatherApi.Application.Services;
using WeatherApi.Infrastructure.OpenWeather;
using WeatherApi.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.Configure<OpenWeatherOptions>(
    builder.Configuration.GetSection(OpenWeatherOptions.SectionName));
builder.Services.AddHttpClient<IWeatherProvider, OpenWeatherProvider>();
builder.Services.AddSingleton<IFavoriteCityRepository, InMemoryFavoriteCityRepository>();
builder.Services.AddScoped<WeatherApplicationService>();
builder.Services.AddScoped<FavoriteCityApplicationService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("MobileApp", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new
        {
            message = "Nao foi possivel processar a requisicao climatica. Verifique a configuracao da API externa."
        });
    });
});

app.UseCors("MobileApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
