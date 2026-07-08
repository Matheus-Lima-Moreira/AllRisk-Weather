using Microsoft.AspNetCore.Mvc;
using WeatherApi.Application.Dtos;
using WeatherApi.Application.Services;

namespace WeatherApi.Controllers;

[ApiController]
[Route("api/favorites")]
public sealed class FavoritesController(FavoriteCityApplicationService favoriteCityService) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<FavoriteCityResponse>> List([FromQuery] string? userId)
    {
        return Ok(favoriteCityService.List(userId));
    }

    [HttpPost]
    public ActionResult<FavoriteCityResponse> Add([FromBody] FavoriteCityRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nome))
        {
            return BadRequest(new { message = "Informe o nome da cidade." });
        }

        var favorite = favoriteCityService.Add(request);
        return CreatedAtAction(nameof(List), new { userId = favorite.UsuarioId }, favorite);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Remove(int id, [FromQuery] string? userId)
    {
        return favoriteCityService.Remove(id, userId) ? NoContent() : NotFound();
    }
}
