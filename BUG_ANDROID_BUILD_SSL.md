# Bug Ticket: React Native Android Build Fails with SSL/TLS Certificate Verification Errors

## Summary
The bare React Native 0.73.6 Android application fails to build due to persistent SSL/TLS certificate verification errors when Gradle attempts to download dependencies from Maven repositories.

## Issue ID
ANDROID-BUILD-001

## Priority
High

## Environment
- **OS**: Windows 11 (Build 26100)
- **Node.js**: v22.13.0
- **npm**: v10.9.2
- **Yarn**: v1.22.22
- **Java**: OpenJDK 17.0.17 (Temurin)
- **Gradle**: 8.3
- **Android SDK**: API 36.1
- **React Native**: 0.73.6
- **Project Structure**: Monorepo with npm workspaces

## Problem Description
When attempting to build the React Native Android app using either command line (`npx react-native run-android`) or Android Studio, the Gradle build process fails with multiple SSL/TLS certificate verification errors when trying to download dependencies from Maven Central and other repositories.

## Steps to Reproduce
1. Clone the repository: `git clone https://github.com/liljoker919/gig-bartending-app.git`
2. Navigate to mobile directory: `cd apps/mobile`
3. Install dependencies: `npm install`
4. Attempt to build: `npx react-native run-android`
5. Or open `apps/mobile/android` in Android Studio and click Build → Make Project

## Expected Behavior
- Gradle downloads all required dependencies from Maven repositories
- Build completes successfully
- APK is generated and installed on Android emulator/device
- App launches and connects to API at `http://localhost:5000`

## Actual Behavior
Build fails with the following errors:

### Error 1: SSL Certificate Verification (Command Line)
```
Could not resolve com.facebook.react:react-native-gradle-plugin:0.73.6.
Could not get resource 'https://repo.maven.apache.org/maven2/com/facebook/react/react-native-gradle-plugin/0.73.6/react-native-gradle-plugin-0.73.6.pom'.
peer not authenticated
No PSK available. Unable to resume.
```

### Error 2: Kotlin Compiler Dependencies
```
Could not resolve org.jetbrains.kotlin:kotlin-util-klib:1.8.0
Could not get resource 'https://repo.maven.apache.org/maven2/org/jetbrains/kotlin/kotlin-util-klib/1.8.0/kotlin-util-klib-1.8.0.jar'.
peer not authenticated
```

### Error 3: Gradle Plugin Compilation (Android Studio)
```
Plugin [id: 'org.gradle.toolchains.foojay-resolver-convention'] was not found
Could not resolve task ':gradle-plugin:inspectClassesForKotlinc'
Cannot access unreachable inputs or outputs
```

### Error 4: React Native Gradle Plugin Descriptor
```
Task ':gradle-plugin:jar' could not resolve plugin artifact 'org.gradle.gradle:org.gradle.toolchains.foojay-resolver-convention.gradle.plugin:5.0'
```

## Root Cause Analysis

### Primary Cause
SSL/TLS certificate verification failure when connecting to Maven repositories (repo.maven.apache.org, plugins.gradle.org, dl.google.com). This appears to be a **system-level network security issue**, likely one of:

1. **Corporate Firewall/Proxy**: Enterprise security software intercepting HTTPS connections
2. **Antivirus Software**: Real-time HTTPS inspection
3. **Network Proxy**: Requiring authentication or certificate pinning
4. **Outdated Java Certificates**: JDK 11 (previously used) has outdated SSL certificates

### Secondary Issues
1. **Gradle Plugin Path Resolution**: The `includeBuild` for `@react-native/gradle-plugin` attempts to compile the plugin from source, which triggers additional dependency downloads that fail
2. **Monorepo npm Workspaces**: Node modules symlinked across workspace boundaries may cause Gradle path resolution issues

## Attempts Made
1. ✅ Updated Kotlin version (1.8.0 → 1.9.0)
2. ✅ Updated Android Gradle Plugin (8.3.0 → 8.1.2)
3. ✅ Added multiple Maven repository sources (Google, Maven Central, Gradle Plugin Portal)
4. ✅ Configured SSL/TLS JVM arguments in gradle.properties
5. ✅ Switched Java version from JDK 11.0.2 to JDK 17.0.17
6. ✅ Removed `includeBuild` for gradle-plugin to use prebuilt binaries
7. ✅ Cleared Gradle cache and wrapper files
8. ✅ Used Android Studio for dependency resolution (more successful than CLI)

## Current Status
- **Web app**: ✅ Running successfully on http://localhost:3000
- **API backend**: ✅ Running successfully on http://localhost:5000
- **Database**: ✅ Running in Docker on port 1433
- **Android build**: ❌ Still failing due to SSL/TLS issues

## Workarounds
1. **Use Web App**: The React web application is fully functional with all features
2. **Different Network**: Build from a different network (mobile hotspot, public WiFi, different computer)
3. **Android Studio**: Android Studio's built-in dependency management may work better than command-line Gradle
4. **Expo**: Convert back to Expo-based development for easier testing on physical devices

## Impact
- Android development cannot proceed until SSL/TLS issue is resolved
- Web and API development are unaffected
- Mobile app testing blocked

## Files Affected
- `apps/mobile/android/settings.gradle` - Gradle project configuration
- `apps/mobile/android/build.gradle` - Gradle build configuration
- `apps/mobile/android/gradle.properties` - Gradle properties and JVM args
- `apps/mobile/android/app/build.gradle` - App-level build configuration

## Suggested Resolution
1. **For immediate testing**: Use web app at http://localhost:3000
2. **For SSL fix**: 
   - Test build on different network
   - Disable corporate proxy/antivirus temporarily
   - Install custom certificates if behind corporate firewall
   - Contact IT if using corporate network
3. **Long-term**: Consider using EAS Build (Expo service) for cloud-based builds

## Related Links
- React Native Android Build Docs: https://reactnative.dev/docs/android-setup
- Gradle Troubleshooting: https://docs.gradle.org/8.3/userguide/build_environment.html
- Maven Central SSL: https://central.sonatype.org/articles/2023/Nov/15/central-repository-moving-to-repo1-maven-org/

## Notes
- The issue is not with the code itself, but with the build environment's network connectivity
- Docker SQL Server and .NET API both configured and working correctly
- Web application demonstrates the full feature set and can serve as primary development interface during Android build troubleshooting
