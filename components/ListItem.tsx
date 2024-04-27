import {Fragment, memo} from 'react'
import dayjs from 'dayjs'
import {View, Image} from 'react-native'

import {DataItem, DataSkill} from '@/data'

import {Icon, IconProps, Text} from './base'

export type ListItemProps = {
  data: DataItem
}

const skillIcon: Record<DataSkill, IconProps & {title: string}> = {
  react: {
    type: 'material-community-icons',
    name: 'react',
    title: 'React',
  },
  aws: {
    type: 'material-community-icons',
    name: 'aws',
    title: 'AWS',
  },
  html: {
    type: 'material-community-icons',
    name: 'language-html5',
    title: 'HTML',
  },
  css: {
    type: 'material-community-icons',
    name: 'language-css3',
    title: 'CSS',
  },
  js: {
    type: 'material-community-icons',
    name: 'language-javascript',
    title: 'JavaScript',
  },
  ts: {
    type: 'material-community-icons',
    name: 'language-typescript',
    title: 'TypeScript',
  },
  graphql: {
    type: 'material-community-icons',
    name: 'graphql',
    title: 'GraphQL',
  },
  'react-native': {
    type: 'material-community-icons',
    name: 'react',
    title: 'React-Native',
  },
  java: {
    type: 'material-community-icons',
    name: 'language-java',
    title: 'Java',
  },
  kotlin: {
    type: 'material-community-icons',
    name: 'language-kotlin',
    title: 'Kotlin',
  },
  swift: {
    type: 'material-community-icons',
    name: 'language-swift',
    title: 'Swift',
  },
  rails: {
    type: 'material-community-icons',
    name: 'language-ruby-on-rails',
    title: 'Rails',
  },
  firebase: {
    type: 'material-community-icons',
    name: 'firebase',
    title: 'Firebase',
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
                  <Fragment key={skill}>
                    <Icon className="text-secondary !text-lg" {...icon} />
                    <Text className="text-secondary text-sm ml-1 mr-2 capitalize">
                      {icon.title}
                    </Text>
                  </Fragment>
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
