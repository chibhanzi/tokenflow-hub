import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.depeer.mobile",
  appName: "DePeer",
  webDir: "dist",
  server: {
    // Development: load from Lovable preview for hot reload
    // Comment this block out for production builds
    url: "https://6b4342cc-989f-4a53-9672-a4744caedd9f.lovableproject.com?forceHideBadge=true",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0d1524",
      showSpinner: false,
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: "#1a2744",
      style: "DARK",
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  android: {
    backgroundColor: "#0d1524",
    allowMixedContent: true,
  },
  ios: {
    backgroundColor: "#0d1524",
    contentInset: "always",
  },
};

export default config;
