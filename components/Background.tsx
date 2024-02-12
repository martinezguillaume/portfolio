import {memo, useEffect} from 'react'
import {ViewProps} from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {DarkTheme, DefaultTheme} from '@react-navigation/native'

import {useColorSchemeStore} from '@/stores'

type Props = ViewProps

export const Background = memo<Props>(({className, style, ...props}) => {
  const {colorScheme} = useColorSchemeStore()
  const colorProgress = useSharedValue(colorScheme === 'light' ? 0 : 1)

  useEffect(() => {
    colorProgress.value = withTiming(colorScheme === 'light' ? 0 : 1)
  }, [colorProgress, colorScheme])

  const contentStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        [DefaultTheme.colors.background, DarkTheme.colors.background],
      ),
    }
  })

  return (
    <Animated.View
      className={`flex-1 absolute top-0 bottom-0 left-0 right-0 ${className}`}
      style={[contentStyle, style]}
      {...props}
    />
  )
})
