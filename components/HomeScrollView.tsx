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

export const HomeScrollView = memo<HomeScrollViewProps>(({ children, ...props }) => {
  const { colorMode } = useColorMode()
  const insets = useSafeAreaInsets()
  const backgroundColor = useColorModeValue('white', 'black')
  const translationY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translationY.value,
        [0, HEADER_OFFSET],
        [insets.top + HEADER_HEIGHT, insets.top + HEADER_HEIGHT_SMALL],
        { extrapolateRight: Extrapolation.CLAMP }
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
      marginTop: interpolate(translationY.value, [0, HEADER_OFFSET], [0, AVATAR_OFFSET], {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }),
    }
  })

  const blurViewProps = useAnimatedProps<BlurViewProps>(() => {
    return {
      intensity:
        Platform.OS !== 'ios'
          ? 0
          : interpolate(
              translationY.value,
              [HEADER_OFFSET + AVATAR_SIZE_SMALL, HEADER_OFFSET + AVATAR_SIZE_SMALL + 50],
              [0, 50],
              { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
            ),
    }
  })

  const headerContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationY.value,
        [HEADER_OFFSET + AVATAR_SIZE_SMALL, HEADER_OFFSET + AVATAR_SIZE_SMALL + 50],
        [0, 1]
      ),
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [HEADER_OFFSET + AVATAR_SIZE_SMALL, HEADER_OFFSET + AVATAR_SIZE_SMALL + 50],
            [50, 0],
            { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
          ),
        },
      ],
    }
  })

  const headerOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity:
        Platform.OS === 'ios'
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
              <Avatar
                source={IMAGES.avatar}
                size="md"
                borderWidth={2}
                borderColor={backgroundColor}
              />
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

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        {...props}
        style={[{ marginTop: insets.top + HEADER_HEIGHT_SMALL }, props.style]}
        contentContainerStyle={[
          { paddingTop: HEADER_OFFSET + (AVATAR_SIZE - AVATAR_OFFSET) },
          props.contentContainerStyle,
        ]}>
        <Animated.Image
          source={IMAGES.avatar}
          style={[styles.avatar, { borderColor: backgroundColor }, avatarStyle]}
        />
        {children}
      </Animated.ScrollView>
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
  },
  avatar: {
    borderRadius: AVATAR_SIZE,
    position: 'absolute',
    top: HEADER_OFFSET - AVATAR_OFFSET,
    left: 16,
    borderWidth: 4,
  },
})
