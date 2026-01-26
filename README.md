# Gig Bartending App 🍸

A cross-platform application that connects bartenders with open shifts. Includes web and mobile experiences where venues can post shifts and bartenders can discover, request, and manage gig-based bartending opportunities.

## Features

- **Cross-Platform**: React Native mobile app and React web app sharing common logic
- **User Roles**: Support for both bartenders and venue owners
- **Authentication**: Login and signup with role-based access
- **Shift Management**: 
  - Venues can post, manage, and cancel shifts
  - Bartenders can browse and request shifts
  - Request/accept workflow for shift assignments
- **Profile Management**: Customize profiles based on user role
- **Monorepo Structure**: Shared logic and types across platforms
- **Ready for API Integration**: Structured for easy backend integration

## Project Structure

```
gig-bartending-app/
├── apps/
│   ├── web/                 # React web application (Vite)
│   │   ├── src/
│   │   │   ├── components/  # Reusable components
│   │   │   ├── pages/       # Page components
│   │   │   └── styles/      # CSS styles
│   │   └── package.json
│   │
│   └── mobile/              # React Native mobile app (Expo)
│       ├── src/
│       │   ├── components/  # Reusable components
│       │   ├── screens/     # Screen components
│       │   └── navigation/  # Navigation setup
│       └── package.json
│
├── services/
│   └── api/                 # .NET Web API backend
│       ├── GigBartending.Api/
│       │   ├── Controllers/ # API endpoints
│       │   ├── Models/      # Domain models
│       │   ├── Services/    # Business logic
│       │   └── Program.cs   # Entry point
│       └── README.md        # API documentation
│
├── packages/
│   └── shared/              # Shared logic and types
│       ├── src/
│       │   ├── types/       # TypeScript interfaces
│       │   ├── contexts/    # React contexts (Auth)
│       │   ├── hooks/       # Custom hooks
│       │   ├── api/         # API client structure
│       │   └── utils/       # Utility functions
│       └── package.json
│
└── package.json             # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- For mobile development:
  - Expo CLI
  - iOS Simulator (Mac only) or Android Studio

### Installation

1. Clone the repository:
```bash
git clone https://github.com/liljoker919/gig-bartending-app.git
cd gig-bartending-app
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file to configure your local environment settings. See the [Environment Configuration](#environment-configuration) section for details.

3. Install dependencies:
```bash
npm install
```

This will install dependencies for all workspaces (root, shared, web, and mobile).

### Running the Applications

#### API (Backend)

For API development, you'll need .NET 8 SDK or later.

```bash
npm run api
```

Or directly:
```bash
cd services/api/GigBartending.Api
dotnet run
```

The API will be available at `http://localhost:5000`

See [services/api/README.md](services/api/README.md) for detailed API documentation.

### Database Setup and Management

The application uses SQL Server running in a Docker container for local development. Database management commands make it easy to reset, migrate, and seed your local database.

#### Prerequisites for Database

- Docker Desktop (Windows/macOS) or Docker Engine (Linux)
- .NET 8 SDK
- SQL Server must be running (via `docker-compose up -d` in `services/api/`)

#### Database Commands

**⚠️ WARNING: These commands are for LOCAL DEVELOPMENT ONLY! Never run these in production!**

All database scripts include safeguards against running in production environments.

**Reset Database (Drop & Recreate):**
```bash
# From repository root
npm run db:reset

# Or from services/api directory
bash db-reset.sh        # Linux/macOS
db-reset.bat           # Windows
```
This will:
- Drop the existing database (all data will be lost!)
- Recreate the database
- Apply all migrations

**Apply Migrations:**
```bash
# From repository root
npm run db:migrate

# Or from services/api directory
bash db-migrate.sh     # Linux/macOS
db-migrate.bat        # Windows
```
This will:
- Apply any pending migrations to the database
- Safe to run multiple times

**Seed Sample Data:**
```bash
# From repository root
npm run db:seed

# Or from services/api directory
bash db-seed.sh        # Linux/macOS
db-seed.bat           # Windows
```
This will:
- Populate the database with sample users and shifts
- Safe to run multiple times (checks if data exists)

#### Complete Reset Workflow

To completely reset your local database from scratch:

```bash
npm run db:reset    # Drop & recreate database with migrations
npm run db:seed     # Add sample data
```

Or as a one-liner:
```bash
npm run db:reset && npm run db:seed
```

#### Sample Data

After seeding, the database will contain:
- **Bartender accounts**: `bartender@example.com`, `jane.bartender@example.com`
- **Venue accounts**: `venue@example.com`, `downtown.venue@example.com`
- **Sample shifts**: 4 open shifts at various venues and times

**Note**: Sample passwords are stored as plaintext (not hashed) for development simplicity. Production applications should use proper password hashing with BCrypt or ASP.NET Core Identity.

#### Troubleshooting Database Issues

If you encounter database issues:
1. Ensure Docker is running: `docker ps`
2. Start SQL Server if needed: `cd services/api && docker-compose up -d`
3. Reset the database: `npm run db:reset`
4. Reseed data: `npm run db:seed`

For detailed database documentation, see [services/api/README.md](services/api/README.md).

#### Web App

```bash
npm run web
```

The web app will be available at `http://localhost:3000`

#### Mobile App

```bash
npm run mobile
```

Then follow the Expo CLI instructions to:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

### Building

#### Web App

```bash
npm run build:web
```

The built files will be in `apps/web/dist/`

## Usage

### Demo Accounts

The app includes mock authentication for demo purposes:

**Bartender Account:**
- Email: `bartender@example.com`
- Password: any password

**Venue Account:**
- Email: `venue@example.com`
- Password: any password

### User Flows

#### For Bartenders:
1. Sign up or log in with bartender role
2. Browse available shifts on the home screen
3. Click "Request This Shift" to request a shift
4. View profile and manage your information

#### For Venues:
1. Sign up or log in with venue role
2. Click "Post New Shift" to create a shift listing
3. Fill in shift details (title, date, time, rate, etc.)
4. View and manage your posted shifts
5. See how many bartenders have requested each shift

## Shared Package

The `@gig-bartending/shared` package contains:

### Types (`types/index.ts`)
- `User`, `UserRole`, `BartenderProfile`, `VenueProfile`
- `Shift`, `ShiftStatus`, `ShiftRequest`
- `AuthState`, `LoginCredentials`, `SignupData`

### Contexts (`contexts/`)
- `AuthContext`: Manages authentication state and login/signup/logout
- `AuthProvider`: Wraps app to provide auth context

### Hooks (`hooks/`)
- `useAuth`: Access authentication state and methods
- `useShifts`: Manage shifts (load, add, request, accept, cancel)

### API Client (`api/`)
- `ApiClient`: Structure for future backend integration
- Currently returns mock data

### Utils (`utils/`)
- `formatCurrency`, `formatDate`, `formatTime`
- `validateEmail`, `validatePassword`

## Technology Stack

- **Frontend Framework**: React 18
- **Mobile Framework**: React Native (Expo)
- **Web Bundler**: Vite
- **Language**: TypeScript
- **Navigation**: 
  - React Router (Web)
  - React Navigation (Mobile)
- **State Management**: React Context API
- **Styling**: 
  - CSS (Web)
  - StyleSheet API (Mobile)

## Environment Configuration

The application uses environment variables for configuration. A `.env.example` file is provided at the repository root with all available configuration options.

### Setup

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` for your local environment.

### Key Environment Variables

- **`VITE_API_BASE_URL`**: API endpoint for the web application (default: `http://localhost:5000`)
- **`EXPO_PUBLIC_API_BASE_URL`**: API endpoint for the mobile application (use your local IP for physical devices)
- **`ASPNETCORE_ENVIRONMENT`**: .NET environment mode (Development, Staging, Production)
- **`DATABASE_CONNECTION_STRING`**: Database connection string for the API
- **`JWT_SECRET`**: Secret key for JWT token generation (change for production!)
- **`CORS_ALLOWED_ORIGINS`**: Allowed origins for CORS (include your web and mobile app URLs)

See `.env.example` for the complete list of configuration options with detailed comments.

### Important Notes

- **Never commit** `.env` files to version control (already configured in `.gitignore`)
- The `.env.example` file documents all available options with safe default values
- Update `JWT_SECRET` and other sensitive values before deploying to production
- For mobile development on physical devices, use your computer's local IP address instead of `localhost`

## Future Enhancements

### Backend Integration
The app is structured for easy backend integration:

1. Replace mock implementations in `packages/shared/src/contexts/AuthContext.tsx`
2. Implement API calls in `packages/shared/src/api/client.ts`
3. Update `useShifts` hook to use real API endpoints
4. Add proper error handling and loading states

### Suggested API Endpoints

```
POST   /api/auth/login
POST   /api/auth/signup
POST   /api/auth/logout
GET    /api/shifts
POST   /api/shifts
PUT    /api/shifts/:id
DELETE /api/shifts/:id
POST   /api/shifts/:id/request
POST   /api/shifts/:id/accept
GET    /api/profile
PUT    /api/profile
```

### Additional Features
- Real-time notifications for shift requests/accepts
- Chat between bartenders and venues
- Rating and review system
- Shift history and analytics
- Payment integration
- Calendar integration
- Push notifications
- Image uploads for profiles
- Advanced search and filtering
- Geolocation for nearby shifts

## Development

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
