import { LocalStorage, SessionStorage } from "quasar";

export function isUserOnboarded() {
  return LocalStorage.getItem("userOnboarded");
}

export function setUserOnboarded(val) {
  LocalStorage.set("userOnboarded", val);
}
