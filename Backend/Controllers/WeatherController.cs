using Microsoft.AspNetCore.Mvc;
using WeatherApi.Application.Dtos;
using WeatherApi.Application.Services;

namespace WeatherApi.Controllers;

[ApiController]
[Route("api/weather")]
public sealed class WeatherController(WeatherApplicationService weatherService) : ControllerBase
{
    [HttpGet("current")]
    public async Task<ActionResult<CurrentWeatherResponse>> GetCurrent([FromQuery] string city, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(city))
        {
            return BadRequest(new { message = "Informe o nome da cidade." });
        }

        var result = await weatherService.GetCurrentAsync(city, cancellationToken);
        return Ok(result);
    }

    [HttpGet("forecast")]
    public async Task<ActionResult<IReadOnlyList<DailyForecastResponse>>> GetForecast([FromQuery] string city, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(city))
        {
            return BadRequest(new { message = "Informe o nome da cidade." });
        }

        var result = await weatherService.GetFiveDayForecastAsync(city, cancellationToken);
        return Ok(result);
    }
}
