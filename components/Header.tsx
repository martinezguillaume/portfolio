import {memo} from 'react'
import {Image, Platform, View} from 'react-native'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {BlurView, BlurViewProps} from 'expo-blur'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {i18n} from '@/i18n'
import {IMAGES} from '@/assets'
import {useValues} from '@/hooks'
import {useColorSchemeStore} from '@/stores'

import {Text} from './base'

export type HeaderProps = {
  scrollY: SharedValue<number>
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export const Header = memo<HeaderProps>(({scrollY}) => {
  const {colorScheme} = useColorSchemeStore()
  const insets = useSafeAreaInsets()

  const {headerHeight, smallHeaderHeight, headerOffset, smallAvatarHeight} =
    useValues()

  const headerThreshold = headerOffset + smallAvatarHeight / 2

  const headerStyle = useAnimatedStyle(() => {
    return {
      zIndex: scrollY.value < headerOffset ? -1 : 1,
      height: interpolate(
        scrollY.value,
        [0, headerHeight - smallHeaderHeight],
        [headerHeight, smallHeaderHeight],
        {
          extrapolateRight: Extrapolation.CLAMP,
        },
      ),
    }
  })

  const headerContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [headerThreshold, headerThreshold + 50],
        [0, 1],
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [headerThreshold, headerThreshold + 50],
            [50, 0],
            {
              extrapolateLeft: Extrapolation.CLAMP,
              extrapolateRight: Extrapolation.CLAMP,
            },
          ),
        },
      ],
    }
  })

  const blurViewProps = useAnimatedProps<BlurViewProps>(() => {
    return {
      intensity:
        Platform.OS !== 'ios'
          ? 0
          : interpolate(
              scrollY.value,
              [headerThreshold, headerThreshold + 50],
              [0, 50],
              {
                extrapolateLeft: Extrapolation.CLAMP,
                extrapolateRight: Extrapolation.CLAMP,
              },
            ),
    }
  })

  const headerOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity:
        Platform.OS === 'ios'
          ? 0
          : interpolate(
              scrollY.value,
              [headerThreshold, headerThreshold + 50],
              [0, 0.7],
              {extrapolateRight: Extrapolation.CLAMP},
            ),
    }
  })

  return (
    <Animated.View className="absolute left-0 right-0" style={headerStyle}>
      <Image
        className="flex-1 w-full"
        alt="cover"
        source={IMAGES.cover}
        resizeMode="cover"
      />

      <Animated.View
        className="absolute inset-x-0 inset-y-0 bg-background"
        style={headerOverlayStyle}
      />

      <AnimatedBlurView
        className="absolute overflow-hidden inset-y-0 inset-x-0 items-center"
        style={{paddingTop: insets.top}}
        tint={colorScheme || undefined}
        animatedProps={blurViewProps}>
        <Animated.View style={headerContentStyle}>
          <View className="flex-row items-center">
            <Image
              className="border-2 border-background-contrast size-20 rounded-full"
              source={IMAGES.avatar}
            />
            <View className="ml-2">
              <Text className="font-extrabold">Guillaume Martinez</Text>
              <Text className="text-sm">{i18n.t('home.title')}</Text>
            </View>
          </View>
        </Animated.View>
      </AnimatedBlurView>
    </Animated.View>
  )
})
