using WeatherApi.Domain.Entities;

namespace WeatherApi.Application.Dtos;

public sealed record FavoriteCityRequest(string Nome, string? UsuarioId);

public sealed record FavoriteCityResponse(int Id, string Nome, string UsuarioId, bool Highlighted)
{
    public static FavoriteCityResponse FromDomain(FavoriteCity favorite)
    {
        return new FavoriteCityResponse(favorite.Id, favorite.Name, favorite.UserId, favorite.Highlighted);
    }
}
