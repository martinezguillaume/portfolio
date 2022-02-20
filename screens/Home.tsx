import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "~/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: FC<Props> = () => {
  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};
