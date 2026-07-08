using System.Text.Json;
using Microsoft.Extensions.Options;
using WeatherApi.Application.Abstractions;
using WeatherApi.Domain.Entities;

namespace WeatherApi.Infrastructure.OpenWeather;

public sealed class OpenWeatherProvider(
    HttpClient httpClient,
    IOptions<OpenWeatherOptions> options,
    ILogger<OpenWeatherProvider> logger) : IWeatherProvider
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly OpenWeatherOptions _options = options.Value;

    public async Task<CurrentWeather> GetCurrentAsync(string city, CancellationToken cancellationToken)
    {
        var payload = await GetFromOpenWeatherAsync<OpenWeatherCurrentDto>("weather", city, cancellationToken);
        var condition = payload.Weather.FirstOrDefault();

        return new CurrentWeather(
            payload.Name,
            payload.Main.Temp,
            payload.Main.TempMin,
            payload.Main.TempMax,
            payload.Main.Humidity,
            MapCondition(condition));
    }

    public async Task<IReadOnlyList<DailyForecast>> GetFiveDayForecastAsync(string city, CancellationToken cancellationToken)
    {
        var payload = await GetFromOpenWeatherAsync<OpenWeatherForecastDto>("forecast", city, cancellationToken);

        return payload.List
            .GroupBy(item => DateOnly.FromDateTime(DateTimeOffset.FromUnixTimeSeconds(item.UnixTime).DateTime))
            .Take(5)
            .Select(MapDailyForecast)
            .ToList();
    }

    private async Task<T> GetFromOpenWeatherAsync<T>(string endpoint, string city, CancellationToken cancellationToken)
    {
        EnsureApiKeyWasConfigured();

        var requestUri = BuildRequestUri(endpoint, city);
        using var response = await httpClient.GetAsync(requestUri, cancellationToken);
        var body = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            logger.LogWarning(
                "OpenWeatherMap returned {StatusCode} for endpoint {Endpoint}: {Body}",
                (int)response.StatusCode,
                endpoint,
                body);

            throw new InvalidOperationException("A API climatica nao conseguiu encontrar dados para essa cidade.");
        }

        return JsonSerializer.Deserialize<T>(body, JsonOptions)
            ?? throw new InvalidOperationException("A API climatica retornou uma resposta vazia.");
    }

    private Uri BuildRequestUri(string endpoint, string city)
    {
        var encodedCity = Uri.EscapeDataString(city);
        var url = $"{_options.BaseUrl.TrimEnd('/')}/{endpoint}?q={encodedCity}&appid={_options.ApiKey}&units=metric&lang=pt_br";
        return new Uri(url);
    }

    private void EnsureApiKeyWasConfigured()
    {
        if (string.IsNullOrWhiteSpace(_options.ApiKey))
        {
            throw new InvalidOperationException(
                "Configure OpenWeatherMap:ApiKey em appsettings.Development.json ou por variavel de ambiente.");
        }
    }

    private static DailyForecast MapDailyForecast(IGrouping<DateOnly, OpenWeatherForecastItemDto> group)
    {
        var representative = group
            .OrderBy(item => Math.Abs(DateTimeOffset.FromUnixTimeSeconds(item.UnixTime).Hour - 12))
            .First();

        return new DailyForecast(
            group.Key,
            group.Min(item => item.Main.TempMin),
            group.Max(item => item.Main.TempMax),
            MapCondition(representative.Weather.FirstOrDefault()));
    }

    private static WeatherCondition MapCondition(OpenWeatherConditionDto? condition)
    {
        return new WeatherCondition(condition?.Description ?? "Sem descricao", condition?.Icon ?? string.Empty);
    }
}
