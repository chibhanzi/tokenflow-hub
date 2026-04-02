# DePeer Mobile App

A Capacitor-based native mobile app wrapping the DePeer web application. Primary target: **Android**, with iOS support ready when needed.

## Prerequisites

- Node.js 18+
- Android Studio (for Android builds)
- Xcode (for iOS builds — macOS only)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the web app
npm run build

# 3. Add Android platform
npx cap add android

# 4. Sync web assets to native project
npx cap sync android

# 5. Run on emulator or connected device
npx cap run android
```

## Project Structure

```
mobile/
├── capacitor.config.ts    # Capacitor configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── src/                   # Shared source (copied from main project on build)
├── public/                # Static assets
├── android/               # Generated Android project (after `cap add android`)
└── ios/                   # Generated iOS project (after `cap add ios`)
```

## Development Workflow

### Hot Reload (Development)

The app is configured to load from the Lovable preview URL during development. To switch to a local build for production:

1. Open `capacitor.config.ts`
2. Remove or comment out the `server` block
3. Run `npx cap sync`

### Building for Production

```bash
# Build web assets
npm run build

# Sync to native platforms
npx cap sync

# Open in Android Studio for release build
npx cap open android
```

### Adding Native Plugins

```bash
# Example: Camera
npm install @capacitor/camera
npx cap sync

# Example: Push Notifications
npm install @capacitor/push-notifications
npx cap sync
```

## Native Features Available

- **Camera**: Document uploads for KYC verification
- **Push Notifications**: Transaction alerts, payout notifications
- **Biometrics**: Fingerprint/face unlock for wallet access
- **Share**: Share token listings and referral links
- **Status Bar**: Themed to match DePeer navy branding
- **Splash Screen**: Branded loading screen

## Android-Specific Notes

- Min SDK: 22 (Android 5.1+)
- Target SDK: 34 (Android 14)
- App ID: `app.depeer.mobile`

## iOS Notes (Future)

- Min deployment target: iOS 14
- Bundle ID: `app.depeer.mobile`
