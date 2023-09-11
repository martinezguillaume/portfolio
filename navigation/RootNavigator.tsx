import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {RootStackParamList} from '~/types'
import {HomeScreen} from '~/screens'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    <RootStack.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Guillaume Martinez - Portfolio'}}
    />
  </RootStack.Navigator>
)
