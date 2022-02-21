import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Fab, useColorMode, Text, Container } from "native-base";
import { FC } from "react";
import { RootStackParamList } from "~/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Container centerContent>
      <Text>Open up App.tsx to start working osn your app!</Text>
      <Fab onPress={toggleColorMode} />
    </Container>
  );
};
