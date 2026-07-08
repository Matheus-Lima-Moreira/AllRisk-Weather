using System.Text.Json.Serialization;

namespace WeatherApi.Infrastructure.OpenWeather;

internal sealed record OpenWeatherCurrentDto(
    string Name,
    OpenWeatherMainDto Main,
    IReadOnlyList<OpenWeatherConditionDto> Weather);

internal sealed record OpenWeatherForecastDto(IReadOnlyList<OpenWeatherForecastItemDto> List);

internal sealed record OpenWeatherForecastItemDto(
    [property: JsonPropertyName("dt")] long UnixTime,
    OpenWeatherMainDto Main,
    IReadOnlyList<OpenWeatherConditionDto> Weather);

internal sealed record OpenWeatherMainDto(
    double Temp,
    [property: JsonPropertyName("temp_min")] double TempMin,
    [property: JsonPropertyName("temp_max")] double TempMax,
    int Humidity);

internal sealed record OpenWeatherConditionDto(string Description, string Icon);
