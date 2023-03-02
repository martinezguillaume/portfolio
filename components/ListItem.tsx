import { Avatar, Column, Icon, IIconProps, Image, Row, Text } from 'native-base'
import { memo } from 'react'
import { Feather, MaterialCommunityIcons } from '@native-base/icons'

import { DataItem, DataSkill } from '~/data'

export type ListItemProps = {
  data: DataItem
}

const skillIcon: Record<DataSkill, IIconProps> = {
  html: {
    as: MaterialCommunityIcons,
    name: 'language-html5',
  },
  css: {
    as: MaterialCommunityIcons,
    name: 'language-css3',
  },
  sql: {
    as: MaterialCommunityIcons,
    name: 'database',
  },
  python: {
    as: MaterialCommunityIcons,
    name: 'language-python',
  },
  js: {
    as: MaterialCommunityIcons,
    name: 'language-javascript',
  },
  ts: {
    as: MaterialCommunityIcons,
    name: 'language-typescript',
  },
  graphql: {
    as: MaterialCommunityIcons,
    name: 'graphql',
  },
}

export const ListItem = memo<ListItemProps>(
  ({
    data: { title, subtitle, avatar, location, startDate, endDate, description, pictures, skills },
  }) => {
    return (
      <Row px={4} py={2} space={2}>
        <Avatar source={typeof avatar === 'string' ? { uri: avatar } : avatar} />

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
              {pictures.map((picture) => (
                <Image key={picture} alt="item-picture" height="100%" flex={1} source={picture} />
              ))}
            </Row>
          )}

          {skills && (
            <Row>
              {skills.map((skill) => (
                <Icon key={skill} color="muted.500" size={5} {...skillIcon[skill]} />
              ))}
            </Row>
          )}

          <Row space={2} flexWrap="wrap" alignItems="center">
            {location && (
              <Text color="muted.500">
                <Icon color="muted.500" size={4} as={Feather} name="map-pin" /> {location}
              </Text>
            )}

            <Text color="muted.500">
              <Icon color="muted.500" size={4} as={Feather} name="calendar" />{' '}
              {startDate.format(!endDate ? 'MMMM YYYY' : 'MMM YYYY')}
              {endDate && ` - ${endDate.format('MMM YYYY')}`}
            </Text>
          </Row>
        </Column>
      </Row>
    )
  }
)
