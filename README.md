# AllRisk Weather

Projeto inicial com API em .NET 9 e app mobile em React Native/Expo para busca climatica, favoritos persistidos localmente e previsao dos proximos 5 dias.

## Backend

Configure sua chave da OpenWeatherMap em `Backend/appsettings.Development.json`:

```json
{
  "OpenWeatherMap": {
    "ApiKey": "SUA_CHAVE"
  }
}
```

Execute a API:

```bash
cd Backend
dotnet run --urls http://0.0.0.0:5000
```

Endpoints principais:

- `GET /api/weather/current?city=Sao Paulo`
- `GET /api/weather/forecast?city=Sao Paulo`
- `GET /api/favorites`
- `POST /api/favorites` com `{ "nome": "Sao Paulo", "usuarioId": "demo-user" }`
- `DELETE /api/favorites/{id}`

Organizacao do backend:

- `Domain`: entidades e regras puras.
- `Application`: contratos, DTOs e servicos de caso de uso.
- `Infrastructure`: integracao com OpenWeatherMap e persistencia em memoria.
- `Controllers`: camada HTTP da API.

## Mobile

Instale Node.js 20 ou superior e depois:

```bash
cd Frontend
npm install
npm start
```