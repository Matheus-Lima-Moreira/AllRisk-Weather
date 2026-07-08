using WeatherApi.Domain.Entities;

namespace WeatherApi.Application.Dtos;

public sealed record CurrentWeatherResponse(
    string City,
    double Temperature,
    double TempMin,
    double TempMax,
    int Humidity,
    string Condition,
    string IconUrl)
{
    public static CurrentWeatherResponse FromDomain(CurrentWeather weather)
    {
        return new CurrentWeatherResponse(
            weather.City,
            Math.Round(weather.Temperature),
            Math.Round(weather.TempMin),
            Math.Round(weather.TempMax),
            weather.Humidity,
            weather.Condition.Description,
            weather.Condition.IconUrl);
    }
}

public sealed record DailyForecastResponse(
    DateOnly Date,
    double TempMin,
    double TempMax,
    string Condition,
    string IconUrl)
{
    public static DailyForecastResponse FromDomain(DailyForecast forecast)
    {
        return new DailyForecastResponse(
            forecast.Date,
            Math.Round(forecast.TempMin),
            Math.Round(forecast.TempMax),
            forecast.Condition.Description,
            forecast.Condition.IconUrl);
    }
}
