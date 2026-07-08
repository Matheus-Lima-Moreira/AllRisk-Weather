using WeatherApi.Domain.Entities;

namespace WeatherApi.Application.Abstractions;

public interface IWeatherProvider
{
    Task<CurrentWeather> GetCurrentAsync(string city, CancellationToken cancellationToken);

    Task<IReadOnlyList<DailyForecast>> GetFiveDayForecastAsync(string city, CancellationToken cancellationToken);
}
