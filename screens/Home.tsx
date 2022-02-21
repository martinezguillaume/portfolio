import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Fab, useColorMode, Image, ScrollView, Text, Box, Avatar } from 'native-base'
import { FC } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateNode,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'

import { IMAGES } from '~/assets'
import { RootStackParamList } from '~/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const AnimatedImage = Animated.createAnimatedComponent(Image)
const AnimatedAvatar = Animated.createAnimatedComponent(Avatar)

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode()
  const translationY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const coverStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(translationY.value, [-100, 0, 100], [300, 200, 100], {
        extrapolateRight: Extrapolation.CLAMP,
      }),
    }
  })

  return (
    <>
      <AnimatedImage source={IMAGES.cover} style={[styles.cover, coverStyle]} />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 200 }}>
        <Text>Salut</Text>
      </Animated.ScrollView>

      <Fab onPress={toggleColorMode} />
    </>
  )
}

const styles = StyleSheet.create({
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    resizeMode: 'cover',
  },
})
