import {useState, ReactElement} from 'react'
import {View} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'

import {
  Header,
  LocaleFab,
  TabView,
  TabViewProps,
  ColorModeFab,
  Background,
  ListHeader,
} from '@/components'
import {data} from '@/data'
import {i18n} from '@/i18n'
import {Text} from '@/components/base'

export default function Home(): ReactElement {
  const scrollY = useSharedValue(0)

  const [routes] = useState<TabViewProps['routes']>(() => [
    {
      key: 'projects',
      title: i18n.t('home.projects'),
      data: data.projects,
    },
    {
      key: 'experiences',
      title: i18n.t('home.experiences'),
      data: data.experiences,
    },
  ])

  return (
    <>
      <Background />

      <View className="flex-1 max-w-screen-sm web:sm:self-center web:border-x border-divider">
        <Header scrollY={scrollY} />

        <TabView
          routes={routes}
          ListHeaderComponent={<ListHeader scrollY={scrollY} />}
          scrollY={scrollY}
        />

        <LocaleFab />
        <ColorModeFab />
      </View>

      <View className="md:absolute bottom-0 right-0 border-t sm:border border-divider bg-background">
        <Text className="!text-[8px] font-bold text-center px-1">
          Cette app est cross-platform (iOS + Android + Web) ❤️
        </Text>
      </View>
    </>
  )
}
