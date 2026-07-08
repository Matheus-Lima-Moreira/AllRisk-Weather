namespace WeatherApi.Domain.Entities;

public sealed record CurrentWeather(
    string City,
    double Temperature,
    double TempMin,
    double TempMax,
    int Humidity,
    WeatherCondition Condition);
