import {
  INativebaseConfig,
  NativeBaseProvider,
  StorageManager,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigation } from "./navigation";

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "dark";
    }
  },
  set: async (value) => {
    try {
      if (value) {
        await AsyncStorage.setItem("@color-mode", value);
      }
    } catch (e) {
      console.log(e);
    }
  },
};

const config: INativebaseConfig = {
  strictMode: "error",
};

export default function App() {
  return (
    <NativeBaseProvider colorModeManager={colorModeManager} config={config}>
      <Navigation />
    </NativeBaseProvider>
  );
}
