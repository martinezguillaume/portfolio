import { Avatar, Box, Icon, Image, Row, Text, useColorMode, useColorModeValue } from 'native-base'
import { memo, useMemo } from 'react'
import { StyleSheet, Platform, LayoutChangeEvent } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { BlurView, BlurViewProps } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { t } from 'i18n-js'
import { Feather } from '@native-base/icons'

import { IMAGES } from '~/assets'
import { useValues } from '~/hooks'

export type HeaderProps = {
  scrollY: Animated.SharedValue<number>
  onLayout: (event: LayoutChangeEvent) => void
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export const Header = memo<HeaderProps>(({ scrollY, onLayout }) => {
  const { colorMode } = useColorMode()
  const insets = useSafeAreaInsets()
  const backgroundColor = useColorModeValue('white', 'black')

  const { headerOffset, coverHeight, smallCoverHeight, avatarSize, smallAvatarSize, avatarOffset } =
    useValues()

  const coverStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, headerOffset], [coverHeight, smallCoverHeight], {
        extrapolateRight: Extrapolation.CLAMP,
      }),
    }
  })

  const avatarStyle = useAnimatedStyle(() => {
    const size = interpolate(scrollY.value, [0, headerOffset], [avatarSize, smallAvatarSize], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    })
    return {
      height: size,
      width: size,
      marginTop: interpolate(scrollY.value, [0, headerOffset], [0, avatarOffset], {
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
              scrollY.value,
              [headerOffset + smallAvatarSize, headerOffset + smallAvatarSize + 50],
              [0, 50],
              { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
            ),
    }
  })

  const coverContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [headerOffset + smallAvatarSize, headerOffset + smallAvatarSize + 50],
        [0, 1]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [headerOffset + smallAvatarSize, headerOffset + smallAvatarSize + 50],
            [50, 0],
            { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
          ),
        },
      ],
    }
  })

  const coverOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity:
        Platform.OS === 'ios'
          ? 0
          : interpolate(
              scrollY.value,
              [headerOffset + smallAvatarSize, headerOffset + smallAvatarSize + 50],
              [0, 0.7],
              { extrapolateRight: Extrapolation.CLAMP }
            ),
    }
  })

  const headerStyle = useAnimatedStyle(() => {
    return {
      zIndex: scrollY.value >= headerOffset ? 1 : 10,
      transform: [{ translateY: -scrollY.value }],
    }
  })

  const data = useMemo<{ description?: string; icon: string; link?: boolean }[]>(
    () => [
      {
        icon: 'map-pin',
        description: t('home.locationDescription'),
      },
      {
        icon: 'gift',
        description: t('home.birthdayDescription'),
      },
      {
        icon: 'link',
        link: true,
        description: 'martinezguillaume.github.com',
      },
      {
        icon: 'calendar',
        description: t('home.developerDescription'),
      },
    ],
    []
  )

  return (
    <>
      <Animated.View style={[styles.cover, coverStyle]}>
        <Image alt="cover" source={IMAGES.cover} flex={1} resizeMode="cover" />

        <Animated.View style={[styles.coverOverlay, { backgroundColor }, coverOverlayStyle]} />

        <AnimatedBlurView
          style={[styles.blurView, { paddingTop: insets.top }]}
          tint={colorMode || undefined}
          animatedProps={blurViewProps}>
          <Animated.View style={coverContentStyle}>
            <Box flexDirection="row" alignItems="center">
              <Avatar
                source={IMAGES.avatar}
                size="md"
                borderWidth={1}
                _light={{ borderColor: 'black' }}
                _dark={{ borderColor: 'white' }}
              />
              <Box ml={2}>
                <Text textAlign="center" fontWeight={800}>
                  Guillaume Martinez
                </Text>
                <Text textAlign="center" fontSize={12}>
                  {t('home.title')}
                </Text>
              </Box>
            </Box>
          </Animated.View>
        </AnimatedBlurView>
      </Animated.View>

      <Animated.View
        onLayout={onLayout}
        style={[
          styles.header,
          headerStyle,
          {
            paddingTop: coverHeight - avatarOffset,
          },
        ]}>
        <Animated.Image
          source={IMAGES.avatar}
          style={[styles.avatar, { borderColor: backgroundColor }, avatarStyle]}
        />
        <Text fontSize={16} fontWeight={800}>
          Guillaume Martinez
        </Text>
        <Text color="muted.500">{t('home.title')}</Text>

        <Text mt={4}>{t('home.description')}</Text>

        <Row flexDirection="row" flexWrap="wrap" mt={2} space={2}>
          {data.map((item) => (
            <Text key={item.icon} fontSize={12} ml={1} mt={2} color="muted.500">
              <Icon color="muted.500" size="4" as={Feather} name={item.icon} /> {item.description}
            </Text>
          ))}
        </Row>
      </Animated.View>
    </>
  )
})

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    paddingHorizontal: 16,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cover: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 5,
  },
  avatar: {
    borderRadius: 200,
    borderWidth: 4,
  },
})
