using System.Collections.Concurrent;
using WeatherApi.Application.Abstractions;
using WeatherApi.Domain.Entities;

namespace WeatherApi.Infrastructure.Persistence;

public sealed class InMemoryFavoriteCityRepository : IFavoriteCityRepository
{
    private readonly ConcurrentDictionary<int, FavoriteCity> _favorites = new();
    private int _nextId;

    public IReadOnlyList<FavoriteCity> List(string userId)
    {
        return _favorites.Values
            .Where(city => city.UserId.Equals(userId, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(city => city.Highlighted)
            .ThenBy(city => city.Name)
            .ToList();
    }

    public FavoriteCity Add(string cityName, string userId)
    {
        var existing = _favorites.Values.FirstOrDefault(city =>
            city.UserId.Equals(userId, StringComparison.OrdinalIgnoreCase) &&
            city.Name.Equals(cityName, StringComparison.OrdinalIgnoreCase));

        if (existing is not null)
        {
            return existing;
        }

        var isFirstFavorite = !_favorites.Values.Any(city =>
            city.UserId.Equals(userId, StringComparison.OrdinalIgnoreCase));

        var favorite = new FavoriteCity(
            Interlocked.Increment(ref _nextId),
            cityName,
            userId,
            isFirstFavorite);

        _favorites[favorite.Id] = favorite;

        return favorite;
    }

    public bool Remove(int id, string userId)
    {
        return _favorites.TryGetValue(id, out var favorite) &&
            favorite.UserId.Equals(userId, StringComparison.OrdinalIgnoreCase) &&
            _favorites.TryRemove(id, out _);
    }
}
