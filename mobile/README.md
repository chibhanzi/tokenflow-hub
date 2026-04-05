# DePeer Mobile App

A feature-rich, native mobile app for DePeer — African SME Tokenisation. Built with React, TypeScript, and Capacitor for cross-platform deployment. Primary target: **Android**, with iOS support ready when needed.

## ✨ Features

- **Beautiful Landing Page**: Hero section with statistics, feature showcase, and call-to-action
- **Token Marketplace**: Browse and invest in verified African SMEs with detailed business information
- **Investor Dashboard**: Portfolio tracking, balance management, and transaction history
- **KYC Verification**: Secure identity verification process
- **Mobile-Optimized UI**: Responsive design with mobile navigation and touch-friendly interactions
- **Real-time Data**: Live balance updates and transaction tracking
- **Multi-Currency Support**: Support for USD, KES, NGN, and ZAR
- **Native Features**: Camera integration, push notifications, and haptic feedback

## 🏗️ Architecture

The mobile app is built as a standalone React application with:

- **React** with TypeScript for robust type safety
- **React Router** for seamless navigation
- **Tailwind CSS** for consistent, responsive styling
- **Radix UI** components for accessible, high-quality UI elements
- **Framer Motion** for smooth animations and transitions
- **Capacitor** for native mobile functionality
- **Vite** for fast development and optimized builds

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Add Android platform
npx cap add android

# 5. Sync web assets to native project
npx cap sync android

# 6. Run on emulator or connected device
npx cap run android
```

## 📱 App Structure

```
mobile/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   │   └── MobileDashboardLayout.tsx  # Mobile-specific layout
│   ├── contexts/            # React contexts for state management
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── android/                 # Generated Android project
├── ios/                     # Generated iOS project
└── capacitor.config.ts      # Capacitor configuration
```

## 🎨 Design System

The mobile app inherits DePeer's design language:

- **Colors**: Navy blue primary, gold accents, clean whites and grays
- **Typography**: Space Grotesk for headings, Inter for body text
- **Components**: Consistent spacing, shadows, and hover states
- **Animations**: Smooth transitions and micro-interactions
- **Icons**: Lucide React icon library for consistency

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Capacitor Commands

- `npx cap add android` - Add Android platform
- `npx cap add ios` - Add iOS platform
- `npx cap sync` - Sync web assets to platforms
- `npx cap run android` - Run on Android device/emulator
- `npx cap run ios` - Run on iOS device/simulator
- `npx cap open android` - Open Android project in Android Studio
- `npx cap open ios` - Open iOS project in Xcode

## 📊 Key Pages

1. **Landing Page** (`/`) - Hero section, features, and onboarding
2. **Marketplace** (`/marketplace`) - Browse and invest in business tokens
3. **Dashboard** (`/dashboard/investor`) - Portfolio overview and analytics
4. **Transactions** (`/transactions`) - Complete transaction history
5. **KYC Verification** (`/kyc`) - Identity verification process

## 🔗 Integration

The mobile app is designed to integrate seamlessly with the DePeer backend API. All business logic, authentication, and data management is handled through the shared backend repository.

## 📈 Performance

- **Fast Loading**: Optimized Vite build with code splitting
- **Efficient Rendering**: React with optimized re-renders
- **Small Bundle**: Tree-shaken dependencies and lazy loading
- **Native Performance**: Capacitor provides near-native performance

## 🛡️ Security

- **Type Safety**: Full TypeScript coverage
- **Secure Storage**: Capacitor's secure storage APIs
- **Input Validation**: Zod schemas for form validation
- **Authentication**: Secure token-based authentication

## 🎯 Roadmap

- [ ] iOS deployment and testing
- [ ] Push notification implementation
- [ ] Offline data synchronization
- [ ] Advanced portfolio analytics
- [ ] Social features for investors
- [ ] Multi-language support

---

Built with ❤️ for Africa's tokenized economy

## Prerequisites

- Node.js 18+
- Android Studio (for Android builds)
- Xcode (for iOS builds — macOS only)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Add Android platform
npx cap add android

# 5. Sync web assets to native project
npx cap sync android

# 6. Run on emulator or connected device
npx cap run android
```

## Project Structure

```
mobile/
├── capacitor.config.ts    # Capacitor configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite build config
├── tailwind.config.ts     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── eslint.config.js       # ESLint config
├── index.html             # HTML entry point
├── src/
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # Main app component
│   ├── index.css          # Global styles
│   ├── vite-env.d.ts      # Vite type definitions
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   ├── hooks/
│   │   └── use-toast.ts   # Toast hook
│   ├── contexts/          # React contexts
│   ├── components/
│   │   └── ui/            # UI components
│   └── pages/             # Page components
├── android/               # Generated Android project (after `cap add android`)
└── ios/                   # Generated iOS project (after `cap add ios`)
```

## Development Workflow

### Development

Run the development server with hot reload:

```bash
npm run dev
```

### Building

Build the app for production:

```bash
npm run build
```

### Capacitor Commands

- `npx cap add android` - Add Android platform
- `npx cap add ios` - Add iOS platform
- `npx cap sync` - Sync web assets to all platforms
- `npx cap sync android` - Sync to Android only
- `npx cap sync ios` - Sync to iOS only
- `npx cap run android` - Run on Android device/emulator
- `npx cap run ios` - Run on iOS device/simulator
- `npx cap open android` - Open Android project in Android Studio
- `npx cap open ios` - Open iOS project in Xcode

## Features

- Mobile-optimized UI inspired by the DePeer website
- User authentication (login/register)
- KYC verification
- Wallet management
- Token marketplace
- Transaction history
- Dashboard for investors and businesses
- Admin panel

## Architecture

The mobile app is built as a standalone React application using:

- **React** with TypeScript for the UI
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Capacitor** for native mobile functionality
- **Vite** for fast development and building

The app shares contexts and business logic with the website but has mobile-specific UI components and navigation patterns.
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
