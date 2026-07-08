using WeatherApi.Application.Abstractions;
using WeatherApi.Application.Dtos;

namespace WeatherApi.Application.Services;

public sealed class WeatherApplicationService(IWeatherProvider weatherProvider)
{
    public async Task<CurrentWeatherResponse> GetCurrentAsync(string city, CancellationToken cancellationToken)
    {
        var weather = await weatherProvider.GetCurrentAsync(city.Trim(), cancellationToken);
        return CurrentWeatherResponse.FromDomain(weather);
    }

    public async Task<IReadOnlyList<DailyForecastResponse>> GetFiveDayForecastAsync(
        string city,
        CancellationToken cancellationToken)
    {
        var forecast = await weatherProvider.GetFiveDayForecastAsync(city.Trim(), cancellationToken);
        return forecast.Select(DailyForecastResponse.FromDomain).ToList();
    }
}
