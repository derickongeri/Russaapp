import { SplashScreen } from "@capacitor/splash-screen";

export default async () => {
  // Optional: Perform any initial setup or data loading here

  // Delay hiding the splash screen
  setTimeout(() => {
    //
    SplashScreen.show({
      showDuration: 10000,
      autoHide: true,
    });
  }, 10000); // 5000ms = 5s
};
