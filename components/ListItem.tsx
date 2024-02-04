import {
  Avatar,
  Column,
  Icon,
  IIconProps,
  Image,
  Row,
  Text,
  IImageProps,
} from 'native-base'
import {memo} from 'react'
import dayjs from 'dayjs'

import {DataItem, DataSkill} from '@/data'
import {ICONS} from '@/assets'

export type ListItemProps = {
  data: DataItem
}

const skillIcon: Record<
  DataSkill,
  ({type?: 'icon'} & IIconProps) | ({type: 'image'} & IImageProps)
> = {
  react: {
    // as: MaterialCommunityIcons,
    name: 'react',
  },
  aws: {
    // as: MaterialCommunityIcons,
    name: 'aws',
  },
  html: {
    // as: MaterialCommunityIcons,
    name: 'language-html5',
  },
  css: {
    // as: MaterialCommunityIcons,
    name: 'language-css3',
  },
  js: {
    // as: MaterialCommunityIcons,
    name: 'language-javascript',
  },
  ts: {
    // as: MaterialCommunityIcons,
    name: 'language-typescript',
  },
  graphql: {
    // as: MaterialCommunityIcons,
    name: 'graphql',
  },
  'react-native': {
    // as: MaterialCommunityIcons,
    name: 'react',
  },
  java: {
    // as: MaterialCommunityIcons,
    name: 'language-java',
    size: 6,
  },
  kotlin: {
    // as: MaterialCommunityIcons,
    name: 'language-kotlin',
    size: 5,
  },
  swift: {
    // as: MaterialCommunityIcons,
    name: 'language-swift',
  },
  'objective-c': {
    type: 'image',
    source: ICONS['objective-c'],
    alt: 'objective-c',
    size: 6,
  },
  expo: {
    type: 'image',
    source: ICONS.expo,
    alt: 'expo',
    px: 1,
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
      <Row px={4} py={2} space={2}>
        <Avatar source={typeof avatar === 'string' ? {uri: avatar} : avatar} />

        <Column flex={1} space={2}>
          <Text fontWeight={800} fontSize={15}>
            {title}
            <Text fontWeight={400} color="muted.500">
              {' · '}
              {subtitle}
            </Text>
          </Text>

          {description && <Text>{description}</Text>}

          {pictures && (
            <Row
              height={250}
              width="100%"
              borderRadius={12}
              overflow="hidden"
              space={0.5}
              borderWidth={1}>
              {pictures.map(picture => (
                <Image
                  key={picture}
                  alt="item-picture"
                  height="100%"
                  flex={1}
                  source={picture}
                />
              ))}
            </Row>
          )}

          {skills && (
            <Row alignItems="center">
              {skills.map(skill => {
                const icon = skillIcon[skill]
                if (icon.type === 'image') {
                  return (
                    <Image
                      key={skill}
                      tintColor="muted.500"
                      size={4}
                      resizeMode="contain"
                      {...icon}
                    />
                  )
                } else {
                  return (
                    <Icon key={skill} color="muted.500" size={5} {...icon} />
                  )
                }
              })}
            </Row>
          )}

          <Row space={2} flexWrap="wrap" alignItems="center">
            {location && (
              <Text color="muted.500">
                {/* FIXME: add an icon */}
                <Icon color="muted.500" size={4} name="map-pin" /> {location}
              </Text>
            )}

            <Text color="muted.500">
              {/* FIXME: add an icon */}
              <Icon color="muted.500" size={4} name="calendar" />{' '}
              {dayjs(startDate).format(!endDate ? 'MMMM YYYY' : 'MMM YYYY')}
              {endDate && ` - ${dayjs(endDate).format('MMM YYYY')}`}
            </Text>
          </Row>
        </Column>
      </Row>
    )
  },
)
