namespace WeatherApi.Domain.Entities;

public sealed record FavoriteCity(int Id, string Name, string UserId, bool Highlighted);
