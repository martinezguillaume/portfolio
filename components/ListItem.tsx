import {memo} from 'react'
import dayjs from 'dayjs'
import {View, Image} from 'react-native'

import {DataItem, DataSkill} from '@/data'

import {Icon, IconProps, Text} from './base'

export type ListItemProps = {
  data: DataItem
}

const skillIcon: Record<DataSkill, IconProps> = {
  react: {
    type: 'material-community-icons',
    name: 'react',
  },
  aws: {
    type: 'material-community-icons',
    name: 'aws',
    className: 'text-2xl',
  },
  html: {
    type: 'material-community-icons',
    name: 'language-html5',
  },
  css: {
    type: 'material-community-icons',
    name: 'language-css3',
  },
  js: {
    type: 'material-community-icons',
    name: 'language-javascript',
  },
  ts: {
    type: 'material-community-icons',
    name: 'language-typescript',
  },
  graphql: {
    type: 'material-community-icons',
    name: 'graphql',
  },
  'react-native': {
    type: 'material-community-icons',
    name: 'react',
  },
  java: {
    type: 'material-community-icons',
    name: 'language-java',
    className: 'text-2xl',
  },
  kotlin: {
    type: 'material-community-icons',
    name: 'language-kotlin',
    className: '!text-lg',
  },
  swift: {
    type: 'material-community-icons',
    name: 'language-swift',
  },
  rails: {
    type: 'material-community-icons',
    name: 'language-ruby-on-rails',
  },
  firebase: {
    type: 'material-community-icons',
    name: 'firebase',
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
                return (
                  <Icon
                    key={skill}
                    {...icon}
                    className={`text-secondary ${icon.className} !text-xl`}
                  />
                )
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
