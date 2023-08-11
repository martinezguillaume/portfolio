import { DefaultTheme } from '@react-navigation/native'
import { Box, Divider, Text, useToken } from 'native-base'
import { LegacyRef, ReactElement, ReactNode, useCallback, useRef, useState } from 'react'
import { Dimensions, FlatList, Platform, ScrollViewProps, StyleSheet } from 'react-native'
import Animated, {
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

import { DataItem } from '~/data'
import { useValues } from '~/hooks'

const initialLayout = { width: Dimensions.get('window').width }
const INDICATOR_WIDTH = 100

export type TabViewProps<T extends Route> = Omit<
  RNTabViewProps<T>,
  'navigationState' | 'onIndexChange' | 'renderScene'
> & {
  routes: T[]
  renderScene: (
    props: SceneRendererProps & {
      route: T
      listProps: Partial<ScrollViewProps> & { ref: LegacyRef<Animated.FlatList<DataItem>> }
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

  const { smallCoverHeight, insets, tabBarHeight, appWidth } = useValues()
  const [index, setIndex] = useState(0)

  const listRef = useRef<{ key: string; value: Animated.FlatList<DataItem> }[]>([])
  const listOffset = useRef<Record<string, number>>({})
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const y = event.contentOffset.y
    scrollY.value = y
    const curRoute = routes[index].key
    listOffset.current[curRoute] = y
  })
  const syncScrollOffset = useCallback(() => {
    const curRouteKey = routes[index].key
    listRef.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY.value < paddingTop && scrollY.value >= 0) {
          if (item.value) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore issue: https://github.com/software-mansion/react-native-reanimated/issues/3023
            item.value.scrollToOffset({
              offset: scrollY.value,
              animated: false,
            })
            listOffset.current[item.key] = scrollY.value
          }
        } else if (scrollY.value >= paddingTop) {
          if (listOffset.current[item.key] < paddingTop || listOffset.current[item.key] == null) {
            if (item.value) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore issue: https://github.com/software-mansion/react-native-reanimated/issues/3023
              item.value.scrollToOffset({
                offset: paddingTop,
                animated: false,
              })
              listOffset.current[item.key] = paddingTop
            }
          }
        }
      }
    })
  }, [index, paddingTop, routes, scrollY.value])

  const tabBarStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
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
        <Box flex={1} _dark={{ bg: 'black' }} _light={{ bg: DefaultTheme.colors.background }}>
          <RNTabBar
            {...tabBarProps}
            style={[styles.tabBar, { borderColor: muted['800'] }]}
            indicatorStyle={{
              width: INDICATOR_WIDTH,
              left: (appWidth / routes.length - INDICATOR_WIDTH) / 2,
              backgroundColor: primary['500'],
            }}
            onTabPress={Platform.OS === 'web' ? syncScrollOffset : undefined}
            renderLabel={({ focused, route }) => (
              <Box flexDirection="row" alignItems="center">
                <Text fontWeight={800} opacity={focused ? 1 : 0.4}>
                  {route.title}
                </Text>
              </Box>
            )}
          />
          <Divider />
        </Box>
      </Animated.View>
    ),
    [appWidth, muted, primary, routes.length, syncScrollOffset, tabBarStyle]
  )

  const renderScene = useCallback<RNTabViewProps<T>['renderScene']>(
    (sceneProps) =>
      renderSceneProps({
        ...sceneProps,
        listProps: {
          showsVerticalScrollIndicator: false,
          contentContainerStyle: {
            paddingTop: paddingTop + tabBarHeight,
            paddingBottom: insets.bottom,
          },
          scrollEventThrottle: 16,
          onScroll: scrollHandler,
          onMomentumScrollEnd: syncScrollOffset,
          onScrollEndDrag: syncScrollOffset,
          ref: (ref) => {
            if (ref) {
              const found = listRef.current.find((e) => e.key === sceneProps.route.key)
              if (!found) {
                listRef.current.push({
                  key: sceneProps.route.key,
                  value: ref,
                })
              }
            }
          },
        },
      }),
    [insets.bottom, paddingTop, renderSceneProps, scrollHandler, syncScrollOffset, tabBarHeight]
  )

  return (
    <RNTabView
      renderTabBar={renderTabBar}
      initialLayout={initialLayout}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      onSwipeStart={syncScrollOffset}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
})
