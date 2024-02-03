import {memo, useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {Box, useColorMode} from 'native-base'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {DarkTheme, DefaultTheme} from '@react-navigation/native'

const AnimatedBox = Animated.createAnimatedComponent(Box)

type Props = {}

export const Background = memo<Props>(() => {
  const {colorMode} = useColorMode()
  const colorProgress = useSharedValue(0)

  useEffect(() => {
    colorProgress.value = withTiming(colorMode === 'light' ? 0 : 1)
  }, [colorMode, colorProgress])

  const contentStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        [DefaultTheme.colors.background, DarkTheme.colors.background],
      ),
    }
  })

  return <AnimatedBox style={[styles.content, contentStyle]} flex={1} />
})

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
  },
})
