namespace WeatherApi.Infrastructure.OpenWeather;

public sealed class OpenWeatherOptions
{
    public const string SectionName = "OpenWeatherMap";

    public string ApiKey { get; init; } = string.Empty;

    public string BaseUrl { get; init; } = "https://api.openweathermap.org/data/2.5";
}
