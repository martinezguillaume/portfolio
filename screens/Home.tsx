import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Box, Divider, Text} from 'native-base'
import {FC, useCallback, useState} from 'react'
import {LayoutChangeEvent, ListRenderItem, StyleSheet} from 'react-native'
// FIXME: https://github.com/software-mansion/react-native-reanimated/issues/3614
// eslint-disable-next-line import/default
import Animated, {useSharedValue} from 'react-native-reanimated'
import {Route} from 'react-native-tab-view'
import {useTheme} from '@react-navigation/native'

import {
  Header,
  LocaleFab,
  ListItem,
  TabView,
  TabViewProps,
  ColorModeFab,
} from '~/components'
import {data, DataItem} from '~/data'
import {useValues} from '~/hooks'
import {RootStackParamList} from '~/types'
import {i18n} from '~/i18n'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: FC<Props> = () => {
  const theme = useTheme()
  const scrollY = useSharedValue(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const {appWidth} = useValues()

  const onHeaderLayout = useCallback(({nativeEvent}: LayoutChangeEvent) => {
    setHeaderHeight(nativeEvent.layout.height)
  }, [])

  const [routes] = useState([
    {key: 'projects', title: i18n.t('home.projects')},
    {key: 'experiences', title: i18n.t('home.experiences')},
  ])

  const getDataKey = useCallback((item: DataItem) => item.id.toString(), [])
  const renderData = useCallback<ListRenderItem<DataItem>>(
    ({item}) => <ListItem data={item} />,
    [],
  )
  const renderScene = useCallback<TabViewProps<Route>['renderScene']>(
    ({route, listProps}) => {
      return (
        <Animated.FlatList
          {...listProps}
          keyExtractor={getDataKey}
          data={route.key === 'experiences' ? data.experiences : data.projects}
          renderItem={renderData}
          ItemSeparatorComponent={Divider}
        />
      )
    },
    [getDataKey, renderData],
  )

  return (
    <>
      <Box
        flex={1}
        _web={{
          width: appWidth,
          alignSelf: 'center',
          borderRightWidth: 1,
          borderLeftWidth: 1,
        }}>
        <Header scrollY={scrollY} onLayout={onHeaderLayout} />

        <TabView
          routes={routes}
          renderScene={renderScene}
          style={styles.tabView}
          scrollY={scrollY}
          paddingTop={headerHeight}
        />

        <LocaleFab />
        <ColorModeFab />
      </Box>
      <Box
        position={{md: 'absolute'}}
        bottom={0}
        right={0}
        borderWidth={{sm: 1, md: 0}}>
        <Text
          textAlign="center"
          fontWeight={700}
          fontSize={8}
          bg={theme.colors.background}
          px={1}>
          Cette app est cross-platform (iOS + Android + Web) ❤️
        </Text>
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  tabView: {
    zIndex: 2,
    ...StyleSheet.absoluteFillObject,
  },
})
