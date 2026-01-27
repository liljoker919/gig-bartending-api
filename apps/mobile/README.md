# Gig Bartending Mobile App

A React Native mobile application for the Gig Bartending platform.

## Tech Stack

- **React Native**: 0.73.6
- **React**: 18.2.0
- **TypeScript**: 5.3.0
- **React Navigation**: Stack and Native navigation
- **Shared Package**: `@gig-bartending/shared` for shared business logic and types

## Prerequisites

### General Requirements
- Node.js 18 or higher
- npm

### iOS Development
- macOS operating system
- Xcode 14.0 or higher
- CocoaPods (usually installed with Xcode)

### Android Development
- Android Studio
- Android SDK (API level 33 or higher)
- Java Development Kit (JDK) 17

## Installation

1. Install dependencies from the repository root:
```bash
npm install
```

2. Install iOS dependencies (macOS only):
```bash
cd apps/mobile/ios
pod install
cd -
```

## Running the App

### Start Metro Bundler

From the repository root:
```bash
npm run mobile
```

Or from the mobile app directory:
```bash
cd apps/mobile
npm start
```

### iOS (macOS only)

From the repository root:
```bash
cd apps/mobile
npx react-native run-ios
```

Or to run on a specific simulator:
```bash
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Android

Ensure you have an Android emulator running or a device connected, then:

From the repository root:
```bash
cd apps/mobile
npx react-native run-android
```

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## Project Structure

```
apps/mobile/
├── android/              # Android native project
├── ios/                  # iOS native project
├── src/
│   ├── components/       # Reusable UI components
│   ├── navigation/       # React Navigation setup
│   ├── screens/          # Screen components
│   └── styles.ts         # Shared styles
├── App.tsx              # Root component
├── index.js             # Entry point
└── package.json         # Dependencies and scripts
```

## Troubleshooting

### iOS

If you encounter build errors:
1. Clean the build folder: `cd ios && xcodebuild clean && cd ..`
2. Reinstall pods: `cd ios && pod install && cd ..`
3. Reset Metro cache: `npm start -- --reset-cache`

### Android

If you encounter build errors:
1. Clean the build: `cd android && ./gradlew clean && cd ..`
2. Reset Metro cache: `npm start -- --reset-cache`
3. Check that Android SDK is properly installed and environment variables are set

### Common Issues

**Metro bundler issues:**
```bash
# Kill any existing Metro processes
killall node

# Start with cache reset
npm start -- --reset-cache
```

**iOS CocoaPods issues:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

## Bundle Identifiers

- **iOS**: `com.gigbartending.GigBartendingMobile`
- **Android**: `com.gigbartending.app`

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
