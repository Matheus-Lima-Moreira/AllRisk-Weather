namespace WeatherApi.Domain.Entities;

public sealed record DailyForecast(
    DateOnly Date,
    double TempMin,
    double TempMax,
    WeatherCondition Condition);
