import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import {Pressable, View, ListRenderItem} from 'react-native'
import {useCallback, useMemo, useState} from 'react'

import {DataItem} from '@/data'
import {useValues} from '@/hooks'

import {ListItem} from './ListItem'
import {Text} from './base'
import {Background} from './Background'

export type TabViewProps = {
  ListHeaderComponent: React.ReactElement
  scrollY: SharedValue<number>
  routes: {key: string; title: string; data: DataItem[]}[]
}

type TabViewDataItem = DataItem | 'tab'

export const TabView = ({
  routes,
  ListHeaderComponent,
  scrollY,
}: TabViewProps) => {
  const {smallHeaderHeight} = useValues()
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })
  const [index, setIndex] = useState(0)

  const currentRoute = routes[index]

  const data = useMemo<TabViewDataItem[]>(
    () => ['tab', ...currentRoute.data],
    [currentRoute.data],
  )

  const TabBar = useMemo(
    () => (
      <View className="flex-row h-12">
        <Background />
        {routes.map((route, i) => (
          <Pressable
            key={route.key}
            className="flex-1 items-center justify-center"
            onPress={() => setIndex(i)}>
            <View className="flex-1 justify-between">
              <View />
              <Text
                className={`font-extrabold px-2 ${
                  index === i ? 'text-primary' : 'text-secondary'
                }`}>
                {route.title}
              </Text>
              <View
                className={`${
                  index === i ? 'bg-primary' : ''
                } h-1 rounded-full`}
              />
            </View>
          </Pressable>
        ))}
      </View>
    ),
    [index, routes],
  )

  const getItemId = useCallback(
    (item: TabViewDataItem) => (item === 'tab' ? item : item.id.toString()),
    [],
  )
  const renderItem = useCallback<ListRenderItem<TabViewDataItem>>(
    ({item}) => (item === 'tab' ? TabBar : <ListItem data={item} />),
    [TabBar],
  )
  const renderSeparator = useCallback(
    () => <View className="h-px bg-divider" />,
    [],
  )

  return (
    <Animated.FlatList
      style={{marginTop: smallHeaderHeight}}
      stickyHeaderIndices={[1]}
      keyExtractor={getItemId}
      data={data}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={renderItem}
      onScroll={scrollHandler}
      ItemSeparatorComponent={renderSeparator}
    />
  )
}
