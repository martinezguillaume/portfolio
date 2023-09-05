import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '~/screens'
import { RootStackParamList } from '~/types'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Guillaume Martinez - Portfolio' }}
    />
  </RootStack.Navigator>
)
