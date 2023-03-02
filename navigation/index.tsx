import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useColorMode, useColorModeValue } from 'native-base'
import { useEffect } from 'react'
import * as SystemUI from 'expo-system-ui'

import { RootNavigator } from './RootNavigator'

export const Navigation = () => {
  const { colorMode } = useColorMode()
  const backgroundColor = useColorModeValue('rgb(242, 242, 242)', 'black')

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(backgroundColor)
  }, [backgroundColor])

  return (
    <NavigationContainer theme={colorMode === 'light' ? DefaultTheme : DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}
