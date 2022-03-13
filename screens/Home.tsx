import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Fab, useColorMode } from 'native-base'
import { FC, useCallback, useState } from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { Route } from 'react-native-tab-view'

import { Header, ListItem, TabView, TabViewProps } from '~/components'
import { data } from '~/data'
import { RootStackParamList } from '~/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode()
  const scrollY = useSharedValue(0)
  const [headerHeight, setHeaderHeight] = useState(0)

  const onHeaderLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setHeaderHeight(nativeEvent.layout.height)
  }, [])

  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  const renderScene = useCallback<TabViewProps<Route>['renderScene']>(
    ({ route, listProps }) => {
      if (route.key === 'first') {
        return (
          <Animated.FlatList
            {...listProps}
            data={data.experiences}
            renderItem={({ item }) => <ListItem data={item} />}
          />
        )
      }
      if (route.key === 'second') {
        return (
          <Animated.FlatList
            {...listProps}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
            contentContainerStyle={{ paddingTop: headerHeight }}
            renderItem={() => (
              <Box height={50} bg="amber.300" borderColor="blue.100" borderWidth={1} />
            )}
          />
        )
      }
    },
    [headerHeight]
  )

  return (
    <Box maxW={600} height="100%">
      <Header scrollY={scrollY} onLayout={onHeaderLayout} />

      <TabView
        routes={routes}
        renderScene={renderScene}
        style={styles.tabView}
        scrollY={scrollY}
        paddingTop={headerHeight}
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
