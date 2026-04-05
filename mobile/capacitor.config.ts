import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.depeer.mobile",
  appName: "DePeer",
  webDir: "dist",
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
