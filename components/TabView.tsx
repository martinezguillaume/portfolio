import { Box, Text, useColorModeValue, useToken } from 'native-base'
import { ReactElement, ReactNode, useCallback, useState } from 'react'
import { Dimensions, ScrollViewProps, StyleSheet } from 'react-native'
import Animated, {
  AnimateProps,
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabView as RNTabView,
  TabViewProps as RNTabViewProps,
  TabBar as RNTabBar,
} from 'react-native-tab-view'

import { useValues } from '~/hooks'

const initialLayout = { width: Dimensions.get('window').width }

export type TabViewProps<T extends Route> = Omit<
  RNTabViewProps<T>,
  'navigationState' | 'onIndexChange' | 'renderScene'
> & {
  routes: T[]
  renderScene: (
    props: SceneRendererProps & {
      route: T
      listProps: Partial<AnimateProps<ScrollViewProps>>
    }
  ) => ReactNode
  scrollY: SharedValue<number>
  paddingTop: number
}

export const TabView = <T extends Route>({
  routes,
  renderScene: renderSceneProps,
  scrollY,
  paddingTop,
  ...props
}: TabViewProps<T>): ReactElement => {
  const primary = useToken('colors', 'primary')
  const muted = useToken('colors', 'muted')
  const backgroundColor = useColorModeValue('white', 'black')

  const { smallCoverHeight } = useValues()
  const [index, setIndex] = useState(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const tabBarStyle = useAnimatedStyle(() => {
    return {
      zIndex: 99,
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, paddingTop - smallCoverHeight],
            [paddingTop, smallCoverHeight],
            {
              extrapolateRight: Extrapolate.CLAMP,
            }
          ),
        },
      ],
    }
  })

  const renderTabBar = useCallback(
    (
      tabBarProps: SceneRendererProps & {
        navigationState: NavigationState<T>
      }
    ) => (
      <Animated.View style={tabBarStyle}>
        <RNTabBar
          {...tabBarProps}
          style={[styles.tabBar, { borderColor: muted['800'], backgroundColor }]}
          indicatorStyle={{ backgroundColor: primary['500'] }}
          renderLabel={({ focused, route }) => (
            <Box flexDirection="row" alignItems="center">
              <Text fontWeight={800} opacity={focused ? 1 : 0.4}>
                {route.title}
              </Text>
            </Box>
          )}
        />
      </Animated.View>
    ),
    [backgroundColor, muted, primary, tabBarStyle]
  )

  const renderScene = useCallback<RNTabViewProps<T>['renderScene']>(
    (sceneProps) =>
      renderSceneProps({
        ...sceneProps,
        listProps: {
          contentContainerStyle: { paddingTop },
          scrollEventThrottle: 1,
          onScroll: scrollHandler,
        },
      }),
    [paddingTop, renderSceneProps, scrollHandler]
  )

  return (
    <RNTabView
      renderTabBar={renderTabBar}
      initialLayout={initialLayout}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: undefined,
    borderBottomWidth: 1,
    elevation: 0,
  },
})
