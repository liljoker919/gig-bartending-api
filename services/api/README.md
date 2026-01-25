# Gig Bartending API

.NET 8 Web API service for the Gig Bartending application.

## Overview

This is the backend API service for the Gig Bartending application. It provides RESTful endpoints for authentication, shift management, user profiles, and more.

## Technology Stack

- **.NET 8**: Modern, high-performance framework
- **ASP.NET Core Web API**: RESTful API framework
- **Entity Framework Core**: ORM for database access (to be configured)
- **JWT Authentication**: Token-based authentication (to be configured)

## Project Structure

```
services/api/
├── GigBartending.Api/           # Main API project
│   ├── Controllers/             # API endpoints
│   ├── Models/                  # Domain models
│   ├── DTOs/                    # Data Transfer Objects
│   ├── Services/                # Business logic layer
│   ├── Data/                    # Database context and repositories
│   ├── Middleware/              # Custom middleware
│   ├── Properties/              # Launch settings
│   ├── Program.cs               # Application entry point
│   ├── appsettings.json         # Configuration
│   └── GigBartending.Api.csproj # Project file
└── GigBartending.slnx           # Solution file
```

## Getting Started

### Prerequisites

- .NET 8 SDK or later
- Visual Studio 2022 / VS Code / Rider (optional)
- SQL Server / PostgreSQL (for production use)
- **Docker Desktop for Windows** (for local SQL Server development)

#### Installing Docker Desktop for Windows

1. **Download Docker Desktop**:
   - Visit: https://www.docker.com/products/docker-desktop
   - Download the Windows version

2. **Install Docker Desktop**:
   - Run the installer as Administrator
   - Follow the installation wizard
   - Restart your computer if prompted

3. **Verify Installation**:
   ```bash
   docker --version
   docker-compose --version
   ```

4. **Start Docker Desktop**:
   - Launch Docker Desktop from Start menu
   - Wait for the Docker whale icon to show it's running
   - The daemon should start automatically

**Note**: Docker Desktop includes both Docker Engine and Docker Compose, so no separate installation is needed.

### Local Development with Docker Compose

This project includes a Docker Compose setup for running SQL Server locally during development.

#### Starting SQL Server

1. Copy the environment file and set your SQL Server password:
```bash
cp ../../.env.example ../../.env
# Edit .env and set SQLSERVER_SA_PASSWORD to a strong password
```

2. Start the SQL Server container:
```bash
docker-compose up -d
```

The SQL Server will be available at `localhost:1433`.

#### Stopping SQL Server

```bash
docker-compose down
```

#### SSMS Connection Details

- **Server**: `localhost,1433`
- **Authentication**: SQL Server Authentication
- **Login**: `sa`
- **Password**: The value of `SQLSERVER_SA_PASSWORD` from your `.env` file
- **Trust Server Certificate**: `true` (recommended for development)

#### Connecting to SSMS (SQL Server Management Studio)

1. **Open SSMS** on your Windows machine.

2. **Connect to Server** dialog:
   - **Server type**: Database Engine
   - **Server name**: `localhost,1433`
   - **Authentication**: SQL Server Authentication
   - **Login**: `sa`
   - **Password**: `YourStrong!Passw0rd` (or your custom password from `.env`)

3. **Connection Options**:
   - Check **"Trust server certificate"** (recommended for development)
   - Optionally check **"Encrypt connection"**

4. **Click "Connect"** - you should now be connected to your Docker SQL Server!

**Test Query** (run in a new query window):
```sql
SELECT @@VERSION AS SQL_Server_Version;
```

**Alternative Connection String** (for other tools):
```
Server=localhost,1433;Database=master;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=true
```

#### Troubleshooting

- **Password Requirements**: SA password must be at least 8 characters and contain uppercase, lowercase, digits, and symbols.
- **Port Conflicts**: If port 1433 is already in use, check if another SQL Server instance is running or change the port mapping in `docker-compose.yml`.
- **Container Logs**: View logs with `docker-compose logs sqlserver`
- **Reset Database**: Remove the container and volume with `docker-compose down -v` then restart.

### Installation

1. Navigate to the API directory:
```bash
cd services/api
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Build the project:
```bash
dotnet build
```

### Running the API

Run in development mode:
```bash
cd GigBartending.Api
dotnet run
```

Or run from the root using the workspace script:
```bash
npm run api
```

The API will be available at:
- HTTP: `http://localhost:5000`
- Development: See `Properties/launchSettings.json` for configured ports

### Running Tests (Future)

```bash
dotnet test
```

## Configuration

Configuration is managed through `appsettings.json` and `appsettings.Development.json`.

### Environment Variables

Key environment variables to configure:
- `ASPNETCORE_ENVIRONMENT`: Development/Staging/Production
- `ConnectionStrings__DefaultConnection`: Database connection string
- `JWT__Secret`: Secret key for JWT token generation
- `JWT__Issuer`: Token issuer
- `JWT__Audience`: Token audience

## API Endpoints

See [API.md](../../API.md) in the root directory for detailed endpoint documentation.

### Planned Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

#### Shifts
- `GET /api/shifts` - Get all shifts
- `GET /api/shifts/{id}` - Get shift by ID
- `POST /api/shifts` - Create new shift (venue only)
- `PUT /api/shifts/{id}` - Update shift (venue only)
- `DELETE /api/shifts/{id}` - Delete shift (venue only)
- `POST /api/shifts/{id}/request` - Request shift (bartender only)
- `POST /api/shifts/{id}/accept` - Accept bartender request (venue only)

#### Profile
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/photo` - Upload profile photo

## Development

### Adding a New Controller

1. Create a new controller in the `Controllers/` directory
2. Inherit from `ControllerBase`
3. Add `[ApiController]` and `[Route("api/[controller]")]` attributes
4. Implement your endpoints

Example:
```csharp
[ApiController]
[Route("api/[controller]")]
public class ShiftsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetShifts()
    {
        // Implementation
        return Ok();
    }
}
```

### Adding a New Service

1. Create an interface in `Services/I{ServiceName}.cs`
2. Create implementation in `Services/{ServiceName}.cs`
3. Register in `Program.cs` with dependency injection

### Database Migrations (Future)

```bash
# Add migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update
```

## Testing

### Unit Tests (Future)

Unit tests will be added in a separate `GigBartending.Api.Tests` project.

### Integration Tests (Future)

Integration tests will be added in a separate `GigBartending.Api.IntegrationTests` project.

## Deployment

### Docker (Future)

A Dockerfile will be provided for containerized deployment.

### Azure App Service

The API can be deployed to Azure App Service:
```bash
dotnet publish -c Release
# Deploy using Azure CLI or Visual Studio
```

### Other Platforms

Compatible with any platform that supports .NET 8:
- AWS Elastic Beanstalk
- Google Cloud Run
- Kubernetes
- Traditional IIS hosting

## Security Considerations

### Planned Security Features

1. **JWT Authentication**: Token-based auth with expiration
2. **HTTPS**: Enforce HTTPS in production
3. **CORS**: Configure allowed origins
4. **Rate Limiting**: Prevent abuse
5. **Input Validation**: Validate all inputs
6. **SQL Injection Protection**: Use parameterized queries (EF Core)
7. **XSS Protection**: Sanitize outputs
8. **Password Hashing**: Use bcrypt or similar

## Performance Considerations

### Planned Optimizations

1. **Response Caching**: Cache GET responses where appropriate
2. **Database Indexing**: Index frequently queried columns
3. **Async/Await**: All I/O operations are async
4. **Connection Pooling**: Efficient database connections
5. **Compression**: Enable response compression

## Monitoring and Logging

### Planned Logging

- Application Insights (Azure)
- Serilog for structured logging
- Health check endpoints
- Performance monitoring

## Contributing

1. Follow C# coding conventions
2. Write unit tests for new features
3. Update API documentation
4. Run tests before committing
5. Use meaningful commit messages

## Next Steps

1. **Implement Authentication**: Add JWT authentication
2. **Add Database**: Configure Entity Framework Core with PostgreSQL/SQL Server
3. **Create Models**: Implement User, Shift, Profile models
4. **Build Controllers**: Implement API endpoints
5. **Add Validation**: Input validation and error handling
6. **Write Tests**: Unit and integration tests
7. **Add Swagger**: API documentation with Swagger/OpenAPI
8. **Configure CORS**: Allow frontend origins
9. **Add Logging**: Implement comprehensive logging
10. **Deployment Setup**: Docker and CI/CD pipelines

## Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [.NET API Guidelines](https://github.com/microsoft/api-guidelines)
- [REST API Best Practices](https://restfulapi.net/)

## License

MIT License - See [LICENSE](../../LICENSE) file for details.
