import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Divider, Fab, useColorMode } from 'native-base'
import { FC, useCallback, useState } from 'react'
import { FlatList, LayoutChangeEvent, ListRenderItem, StyleSheet } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { Route } from 'react-native-tab-view'

import { Header, ListItem, TabView, TabViewProps } from '~/components'
import { data, DataItem } from '~/data'
import { RootStackParamList } from '~/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode()
  const scrollY = useSharedValue(0)
  const [headerHeight, setHeaderHeight] = useState(0)

  const onHeaderLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setHeaderHeight(nativeEvent.layout.height)
  }, [])

  const [routes] = useState([
    { key: 'projects', title: 'Projects' },
    { key: 'experiences', title: 'Experiences' },
  ])

  const getDataKey = useCallback((item: DataItem) => item.id.toString(), [])
  const renderData = useCallback<ListRenderItem<DataItem>>(
    ({ item }) => <ListItem data={item} />,
    []
  )
  const renderScene = useCallback<TabViewProps<Route>['renderScene']>(
    ({ route, listProps }) => {
      return (
        <Animated.FlatList
          {...listProps}
          ref={console.log}
          keyExtractor={getDataKey}
          data={route.key === 'experiences' ? data.experiences : data.projects}
          renderItem={renderData}
          ItemSeparatorComponent={Divider}
        />
      )
    },
    [getDataKey, renderData]
  )

  return (
    <Box
      flex={1}
      _web={{
        minW: 600,
        alignSelf: 'center',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'muted.800',
      }}>
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
