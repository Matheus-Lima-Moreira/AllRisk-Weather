using WeatherApi.Application.Abstractions;
using WeatherApi.Application.Dtos;

namespace WeatherApi.Application.Services;

public sealed class FavoriteCityApplicationService(IFavoriteCityRepository repository)
{
    private const string DefaultUserId = "demo-user";

    public IReadOnlyList<FavoriteCityResponse> List(string? userId)
    {
        return repository.List(NormalizeUserId(userId))
            .Select(FavoriteCityResponse.FromDomain)
            .ToList();
    }

    public FavoriteCityResponse Add(FavoriteCityRequest request)
    {
        var favorite = repository.Add(request.Nome.Trim(), NormalizeUserId(request.UsuarioId));
        return FavoriteCityResponse.FromDomain(favorite);
    }

    public bool Remove(int id, string? userId)
    {
        return repository.Remove(id, NormalizeUserId(userId));
    }

    private static string NormalizeUserId(string? userId)
    {
        return string.IsNullOrWhiteSpace(userId) ? DefaultUserId : userId.Trim();
    }
}
