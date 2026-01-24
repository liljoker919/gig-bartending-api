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

2. Install dependencies:
```bash
npm install
```

This will install dependencies for all workspaces (root, shared, web, and mobile).

### Running the Applications

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
