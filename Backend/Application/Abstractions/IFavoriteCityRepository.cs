using WeatherApi.Domain.Entities;

namespace WeatherApi.Application.Abstractions;

public interface IFavoriteCityRepository
{
    IReadOnlyList<FavoriteCity> List(string userId);

    FavoriteCity Add(string cityName, string userId);

    bool Remove(int id, string userId);
}
