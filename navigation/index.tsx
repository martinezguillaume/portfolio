import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useColorMode } from "native-base";
import { RootNavigator } from "./RootNavigator";

export const Navigation = () => {
  const { colorMode } = useColorMode();

  return (
    <NavigationContainer
      theme={colorMode === "light" ? DefaultTheme : DarkTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};
