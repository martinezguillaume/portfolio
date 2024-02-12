import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {Linking, View} from 'react-native'
import {useMemo} from 'react'

import {IMAGES} from '@/assets'
import {useValues} from '@/hooks'
import {i18n} from '@/i18n'

import {Icon, IconProps, Text} from './base'

type ListHeaderProps = {
  scrollY: SharedValue<number>
}

export const ListHeader = ({scrollY}: ListHeaderProps) => {
  const {
    smallHeaderHeight,
    headerOffset,
    avatarHeight,
    avatarOffset,
    smallAvatarHeight,
    headerHeight,
  } = useValues()

  const data = useMemo<
    {description?: string; icon: IconProps; link?: string}[]
  >(
    () => [
      {
        icon: {name: 'map-pin'},
        description: i18n.t('home.locationDescription'),
      },
      {
        icon: {name: 'gift'},
        description: i18n.t('home.birthdayDescription'),
      },
      {
        icon: {name: 'github'},
        link: 'https://github.com/martinezguillaume/portfolio',
        description: 'github.com',
      },
      {
        icon: {name: 'calendar'},
        description: i18n.t('home.developerDescription'),
      },
    ],
    [],
  )

  const avatarStyle = useAnimatedStyle(() => {
    const size = interpolate(
      scrollY.value,
      [0, headerOffset],
      [avatarHeight, smallAvatarHeight],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    )
    return {
      height: size,
      width: size,
    }
  })

  return (
    <Animated.View
      className="px-4 pb-4"
      style={{paddingTop: headerHeight - avatarOffset - smallHeaderHeight}}>
      <View className="justify-end" style={{height: avatarHeight}}>
        <Animated.Image
          className="border-2 rounded-full border-background"
          source={IMAGES.avatar}
          style={avatarStyle}
        />
      </View>

      <Text className="text-lg font-bold">Guillaume Martinez</Text>
      <Text className="text-secondary">{i18n.t('home.title')}</Text>

      <Text className="mt-4">{i18n.t('home.description')}</Text>

      <View className="flex-row flex-wrap mt-4 items-center">
        {data.map(item => (
          <View key={item.icon.name} className="flex-row items-center mr-4">
            <Text
              onPress={
                item.link
                  ? () => {
                      if (item.link) {
                        Linking.openURL(item.link)
                      }
                    }
                  : undefined
              }
              className={`${
                item.link ? 'text-primary' : 'text-secondary'
              } text-sm`}>
              <Icon className="text-lg text-secondary" {...item.icon} />{' '}
              {item.description}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  )
}
