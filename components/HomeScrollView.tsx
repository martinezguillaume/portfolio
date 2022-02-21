import { Image, Text, useColorMode, useColorModeValue } from 'native-base'
import { memo } from 'react'
import { ScrollViewProps, StyleSheet } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { BlurView, BlurViewProps } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { IMAGES } from '~/assets'

export type HomeScrollViewProps = ScrollViewProps

const COVER_HEIGHT = 200
const COVER_HEIGHT_SMALL = 100
const AVATAR_SIZE = 120

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export const HomeScrollView = memo<HomeScrollViewProps>((props) => {
  const { colorMode } = useColorMode()
  const insets = useSafeAreaInsets()
  const backgroundColor = useColorModeValue('white', 'black')
  const translationY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const coverStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translationY.value,
        [0, COVER_HEIGHT_SMALL],
        [COVER_HEIGHT, COVER_HEIGHT_SMALL],
        {
          extrapolateRight: Extrapolation.CLAMP,
        }
      ),
    }
  })

  const avatarStyle = useAnimatedStyle(() => {
    const size = interpolate(
      translationY.value,
      [0, COVER_HEIGHT_SMALL],
      [AVATAR_SIZE, AVATAR_SIZE / 2],
      { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP }
    )
    return {
      height: size,
      width: size,
      // width: 100,
      // height: 100,
      zIndex: translationY.value >= COVER_HEIGHT_SMALL ? 1 : 3,
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [-50, 0, COVER_HEIGHT_SMALL, COVER_HEIGHT_SMALL + 50],
            [
              COVER_HEIGHT - AVATAR_SIZE / 2 + 50,
              COVER_HEIGHT - AVATAR_SIZE / 2,
              COVER_HEIGHT_SMALL,
              COVER_HEIGHT_SMALL - 50,
            ]
          ),
        },
      ],
    }
  })

  const blurViewProps = useAnimatedProps<BlurViewProps>(() => {
    return {
      intensity: interpolate(
        translationY.value,
        [COVER_HEIGHT_SMALL + AVATAR_SIZE / 2, COVER_HEIGHT_SMALL + AVATAR_SIZE / 2 + 20],
        [0, 50],
        { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
      ),
    }
  })

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationY.value,
        [COVER_HEIGHT_SMALL + AVATAR_SIZE / 2, COVER_HEIGHT_SMALL + AVATAR_SIZE / 2 + 20],
        [0, 1]
      ),
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [COVER_HEIGHT_SMALL + AVATAR_SIZE / 2, COVER_HEIGHT_SMALL + AVATAR_SIZE / 2 + 20],
            [20, 0],
            { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
          ),
        },
      ],
    }
  })

  return (
    <>
      <Animated.View style={[styles.coverWrapper, coverStyle]}>
        <Image alt="cover" source={IMAGES.cover} flex={1} resizeMode="cover" />
        <AnimatedBlurView
          style={[styles.blurView, { paddingTop: insets.top }]}
          tint={colorMode || undefined}
          animatedProps={blurViewProps}>
          <Animated.View style={headerStyle}>
            <Text textAlign="center" fontWeight={800}>
              Guillaume Martinez
            </Text>
            <Text textAlign="center" fontSize={12}>
              @martinezguillaume
            </Text>
          </Animated.View>
        </AnimatedBlurView>
      </Animated.View>

      <Animated.Image
        source={IMAGES.avatar}
        style={[styles.avatar, { borderColor: backgroundColor }, avatarStyle]}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        {...props}
        style={[styles.scrollView, props.style]}
        contentContainerStyle={[styles.scrollViewContent, props.contentContainerStyle]}
      />
    </>
  )
})

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 2,
  },
  avatar: {
    top: 0,
    left: 16,
    borderRadius: AVATAR_SIZE,
    position: 'absolute',
    borderWidth: 4,
  },
  scrollView: {
    zIndex: 4,
    marginTop: COVER_HEIGHT_SMALL,
  },
  scrollViewContent: {
    paddingTop: COVER_HEIGHT - COVER_HEIGHT_SMALL + AVATAR_SIZE / 2,
  },
})
