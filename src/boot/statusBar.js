import { StatusBar } from "@capacitor/status-bar";

export default function setStatusBarColor(color) {
  StatusBar.setBackgroundColor({ color });
}
