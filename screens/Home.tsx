import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Fab, useColorMode, Text } from "native-base";
import { FC } from "react";
import { RootStackParamList } from "~/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Box>
      <Text>Open up App.tsx to start working osn your app!</Text>
      <Fab onPress={toggleColorMode} />
    </Box>
  );
};
