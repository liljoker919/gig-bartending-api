# Setup Guide

This guide will help you get the Gig Bartending App up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download Git](https://git-scm.com/)

For mobile development, you'll also need:
- **Expo CLI** - Will be installed via npm
- **iOS Simulator** (Mac only) or **Android Studio** for Android emulator
- **Expo Go app** on your phone (optional, for testing on physical device)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/liljoker919/gig-bartending-app.git
cd gig-bartending-app
```

### 2. Install Dependencies

Install all dependencies for the monorepo:

```bash
npm install
```

This command will install dependencies for:
- Root workspace
- `packages/shared` - Shared logic package
- `apps/web` - Web application
- `apps/mobile` - Mobile application

### 3. Build the Shared Package

The shared package needs to be built before running the apps:

```bash
cd packages/shared
npm run build
cd ../..
```

## Running the Applications

### Web Application

To run the web app in development mode:

```bash
npm run web
```

The web app will be available at `http://localhost:3000`

To build the web app for production:

```bash
npm run build:web
```

The built files will be in `apps/web/dist/`

### Mobile Application

To run the mobile app:

```bash
npm run mobile
```

This will start the Expo development server. You can then:

- Press `i` to open iOS Simulator (Mac only)
- Press `a` to open Android Emulator
- Scan the QR code with the Expo Go app on your phone

## Project Structure

```
gig-bartending-app/
├── apps/
│   ├── web/                 # React web application
│   └── mobile/              # React Native mobile app
├── packages/
│   └── shared/              # Shared logic and types
└── package.json             # Root workspace configuration
```

## Demo Accounts

The application includes mock authentication for demonstration. Use these credentials:

**Bartender Account:**
- Email: `bartender@example.com`
- Password: any password (e.g., `password123`)

**Venue Account:**
- Email: `venue@example.com`
- Password: any password (e.g., `password123`)

## Features to Test

### As a Bartender:
1. Login with bartender account
2. Browse available shifts
3. Click "Request This Shift" to request a shift
4. View your profile

### As a Venue:
1. Login with venue account
2. Click "Post New Shift" (Note: Currently requires staying on the same page without reload)
3. View posted shifts
4. See shift requests from bartenders

## Development Commands

### Type Checking

Check TypeScript types across all workspaces:

```bash
npm run type-check
```

### Linting

Run linters across all workspaces (if configured):

```bash
npm run lint
```

## Troubleshooting

### Issue: Dependencies not installing correctly

**Solution:** Clear npm cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Shared package changes not reflected

**Solution:** Rebuild the shared package:
```bash
cd packages/shared
npm run build
cd ../..
```

### Issue: Web app shows blank page

**Solution:** Check the browser console for errors. Ensure the shared package is built.

### Issue: Mobile app won't start

**Solution:** 
1. Ensure you're in the root directory
2. Clear Expo cache: `cd apps/mobile && npx expo start -c`
3. Reinstall dependencies

### Issue: Auth state resets on page reload

**Solution:** This is expected behavior in the current demo implementation. The authentication state is stored in memory only. In a production environment, you would:
- Use localStorage/sessionStorage for web
- Use AsyncStorage for React Native
- Implement proper JWT token handling with backend

## Known Limitations

1. **No Persistence**: Data is stored in memory and resets on page reload
2. **No Backend**: Currently uses mock data and authentication
3. **Limited Navigation**: Some navigation requires using browser back/forward
4. **No Real-time Updates**: Changes don't sync across different users

## Next Steps

To make this production-ready:

1. **Backend Integration**:
   - Implement REST API or GraphQL backend
   - Update API client in `packages/shared/src/api/client.ts`
   - Replace mock data with real API calls

2. **State Persistence**:
   - Add localStorage for web
   - Add AsyncStorage for mobile
   - Implement proper authentication token management

3. **Enhanced Features**:
   - Real-time notifications
   - Image upload for profiles
   - Chat between bartenders and venues
   - Payment integration
   - Advanced search and filtering

## Support

For issues or questions, please open an issue on the GitHub repository.
