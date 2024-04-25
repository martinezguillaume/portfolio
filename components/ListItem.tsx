import {memo} from 'react'
import dayjs from 'dayjs'
import {ImageProps, View, Image} from 'react-native'

import {DataItem, DataSkill} from '@/data'
import {ICONS} from '@/assets'

import {Icon, IconProps, Text} from './base'

export type ListItemProps = {
  data: DataItem
}

const skillIcon: Record<
  DataSkill,
  ({as?: 'icon'} & IconProps) | ({as: 'image'} & ImageProps)
> = {
  react: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'react',
  },
  aws: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'aws',
    className: 'text-2xl',
  },
  html: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'language-html5',
  },
  css: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'language-css3',
  },
  js: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'language-javascript',
  },
  ts: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'language-typescript',
  },
  graphql: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'graphql',
  },
  'react-native': {
    as: 'icon',
    type: 'material-community-icons',
    name: 'react',
  },
  java: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'language-java',
    className: 'text-2xl',
  },
  kotlin: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'language-kotlin',
    className: '!text-lg',
  },
  swift: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'language-swift',
  },
  'objective-c': {
    as: 'image',
    source: ICONS['objective-c'],
    alt: 'objective-c',
    className: 'size-6',
  },
  expo: {
    as: 'image',
    source: ICONS.expo,
    alt: 'expo',
    className: 'mx-[1]',
  },
  rails: {
    as: 'icon',
    type: 'material-community-icons',
    name: 'language-ruby-on-rails',
  },
}

export const ListItem = memo<ListItemProps>(
  ({
    data: {
      title,
      subtitle,
      avatar,
      location,
      startDate,
      endDate,
      description,
      pictures,
      skills,
    },
  }) => {
    return (
      <View className="flex-row px-4 py-2 gap-2">
        <Image
          className="!size-16 rounded-full"
          source={typeof avatar === 'string' ? {uri: avatar} : avatar}
        />

        <View className="flex-1 gap-2">
          <Text className="font-bold">
            {title}
            <Text className="font-normal text-secondary">
              {' · '}
              {subtitle}
            </Text>
          </Text>

          {description && <Text>{description}</Text>}

          {pictures && (
            <View className="flex-row w-full h-64 rounded-xl gap-0.5 overflow-hidden border-[1px] border-divider">
              {pictures.map(picture => (
                <Image
                  key={picture}
                  alt="item-picture"
                  className="!h-full flex-1"
                  source={picture}
                />
              ))}
            </View>
          )}

          {skills && (
            <View className="flex-row items-center">
              {skills.map(skill => {
                const icon = skillIcon[skill]
                if (icon.as === 'image') {
                  return (
                    <Image
                      key={skill}
                      resizeMode="contain"
                      {...icon}
                      className={`!size-4 color-secondary ${icon.className}`}
                    />
                  )
                } else {
                  return (
                    <Icon
                      key={skill}
                      {...icon}
                      className={`text-secondary ${icon.className} !text-xl`}
                    />
                  )
                }
              })}
            </View>
          )}

          <View className="flex-row flex-wrap gap-2 items-center">
            {location && (
              <Text className="text-secondary text-sm">
                <Icon className="text-secondary" name="map-pin" /> {location}
              </Text>
            )}

            <Text className="color-secondary text-sm">
              <Icon className="color-secondary" name="calendar" />{' '}
              {dayjs(startDate).format(!endDate ? 'MMMM YYYY' : 'MMM YYYY')}
              {endDate && ` - ${dayjs(endDate).format('MMM YYYY')}`}
            </Text>
          </View>
        </View>
      </View>
    )
  },
)
