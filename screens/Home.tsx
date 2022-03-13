import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Fab, useColorMode } from 'native-base'
import { FC, useCallback, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, useWindowDimensions } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { TabView, Route, TabBar } from 'react-native-tab-view'

import { Header } from '~/components'
import { data } from '~/data'
import { useValues } from '~/hooks'
import { RootStackParamList } from '~/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode()
  const layout = useWindowDimensions()
  const scrollY = useSharedValue(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const { smallCoverHeight } = useValues()

  const onHeaderLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setHeaderHeight(nativeEvent.layout.height)
  }, [])

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const renderScene = useCallback(
    ({ route }: { route: Route }) => {
      if (route.key === 'first') {
        return (
          <Animated.FlatList
            scrollEventThrottle={1}
            onScroll={scrollHandler}
            data={data.experiences}
            contentContainerStyle={{ paddingTop: headerHeight }}
            renderItem={() => (
              <Box height={50} bg="amber.300" borderColor="blue.100" borderWidth={1} />
            )}
          />
        )
      }
      if (route.key === 'second') {
        return (
          <Animated.FlatList
            scrollEventThrottle={1}
            onScroll={scrollHandler}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
            contentContainerStyle={{ paddingTop: headerHeight }}
            renderItem={() => (
              <Box height={50} bg="amber.300" borderColor="blue.100" borderWidth={1} />
            )}
          />
        )
      }
    },
    [headerHeight, scrollHandler]
  )

  const tabBarStyle = useAnimatedStyle(() => {
    return {
      zIndex: 99,
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, headerHeight - smallCoverHeight],
            [headerHeight, smallCoverHeight],
            {
              extrapolateRight: Extrapolate.CLAMP,
            }
          ),
        },
      ],
    }
  })
  const renderTabBar = useCallback(
    (props) => {
      return (
        <Animated.View style={tabBarStyle}>
          <TabBar {...props} />
        </Animated.View>
      )
    },
    [tabBarStyle]
  )

  return (
    <Box height="100%" width="100%">
      <Header scrollY={scrollY} onLayout={onHeaderLayout} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />

      <Fab onPress={toggleColorMode} />
    </Box>
  )
}

const styles = StyleSheet.create({
  tabView: {
    zIndex: 2,
    ...StyleSheet.absoluteFillObject,
  },
})
