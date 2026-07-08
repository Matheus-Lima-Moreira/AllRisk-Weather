namespace WeatherApi.Domain.Entities;

public sealed record WeatherCondition(string Description, string IconCode)
{
    public string IconUrl => string.IsNullOrWhiteSpace(IconCode)
        ? string.Empty
        : $"https://openweathermap.org/img/wn/{IconCode}@2x.png";
}
