import { Avatar, Box, Image, Text, useColorMode, useColorModeValue } from 'native-base'
import { memo, useMemo } from 'react'
import { ScrollViewProps, StyleSheet, Platform } from 'react-native'
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

const HEADER_HEIGHT = 180
const HEADER_HEIGHT_SMALL = 80
const AVATAR_SIZE = 120
const AVATAR_SIZE_SMALL = 80

const HEADER_OFFSET = HEADER_HEIGHT - HEADER_HEIGHT_SMALL
const AVATAR_OFFSET = AVATAR_SIZE - AVATAR_SIZE_SMALL

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export const HomeScrollView = memo<HomeScrollViewProps>((props) => {
  const { colorMode } = useColorMode()
  const insets = useSafeAreaInsets()
  const backgroundColor = useColorModeValue('white', 'black')
  const translationY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const { headerHeight, smallHeaderHeight } = useMemo(
    () => ({
      headerHeight: HEADER_HEIGHT + insets.top,
      smallHeaderHeight: HEADER_HEIGHT_SMALL + insets.top,
    }),
    [insets.top]
  )

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translationY.value,
        [0, HEADER_OFFSET],
        [headerHeight, smallHeaderHeight],
        {
          extrapolateRight: Extrapolation.CLAMP,
        }
      ),
    }
  })

  const avatarStyle = useAnimatedStyle(() => {
    const size = interpolate(
      translationY.value,
      [0, HEADER_OFFSET],
      [AVATAR_SIZE, AVATAR_SIZE_SMALL],
      { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP }
    )
    return {
      height: size,
      width: size,
      zIndex: translationY.value >= HEADER_OFFSET ? 1 : 3,
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [-1, 0, HEADER_OFFSET, HEADER_OFFSET + 1],
            [
              headerHeight - AVATAR_OFFSET + 1,
              headerHeight - AVATAR_OFFSET,
              smallHeaderHeight,
              smallHeaderHeight - 1,
            ]
          ),
        },
      ],
    }
  })

  const blurViewProps = useAnimatedProps<BlurViewProps>(() => {
    return {
      intensity:
        Platform.OS === 'web'
          ? 0
          : interpolate(
              translationY.value,
              [HEADER_OFFSET + AVATAR_SIZE_SMALL, HEADER_OFFSET + AVATAR_SIZE_SMALL + 20],
              [0, 50],
              { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
            ),
    }
  })

  const headerContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationY.value,
        [HEADER_OFFSET + AVATAR_SIZE_SMALL, HEADER_OFFSET + AVATAR_SIZE_SMALL + 20],
        [0, 1]
      ),
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [HEADER_OFFSET + AVATAR_SIZE_SMALL, HEADER_OFFSET + AVATAR_SIZE_SMALL + 20],
            [20, 0],
            { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
          ),
        },
      ],
    }
  })

  const headerOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity:
        Platform.OS !== 'web'
          ? 0
          : interpolate(
              translationY.value,
              [HEADER_OFFSET + AVATAR_SIZE_SMALL, HEADER_OFFSET + AVATAR_SIZE_SMALL + 20],
              [0, 0.7],
              { extrapolateRight: Extrapolation.CLAMP }
            ),
    }
  })

  return (
    <>
      <Animated.View style={[styles.header, headerStyle]}>
        <Image alt="cover" source={IMAGES.cover} flex={1} resizeMode="cover" />

        <Animated.View style={[styles.headerOverlay, { backgroundColor }, headerOverlayStyle]} />

        <AnimatedBlurView
          style={[styles.blurView, { paddingTop: insets.top }]}
          tint={colorMode || undefined}
          animatedProps={blurViewProps}>
          <Animated.View style={headerContentStyle}>
            <Box flexDirection="row" alignItems="center">
              <Avatar source={IMAGES.avatar} size="md" />
              <Box ml={2}>
                <Text textAlign="center" fontWeight={800}>
                  Guillaume Martinez
                </Text>
                <Text textAlign="center" fontSize={12}>
                  @martinezguillaume
                </Text>
              </Box>
            </Box>
          </Animated.View>
        </AnimatedBlurView>
      </Animated.View>

      <Animated.Image
        source={IMAGES.avatar}
        style={[styles.avatar, { borderColor: backgroundColor }, avatarStyle]}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        {...props}
        style={[styles.scrollView, { marginTop: smallHeaderHeight }, props.style]}
        contentContainerStyle={[
          { paddingTop: HEADER_OFFSET + AVATAR_SIZE - AVATAR_OFFSET },
          props.contentContainerStyle,
        ]}
      />
    </>
  )
})

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
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
  },
})
