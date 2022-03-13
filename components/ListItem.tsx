import { Avatar, Column, Icon, Row, Text } from 'native-base'
import { memo } from 'react'
import { Feather } from '@native-base/icons'

import { DataItem } from '~/data'

export type ListItemProps = {
  data: DataItem
}

export const ListItem = memo<ListItemProps>(
  ({ data: { title, avatar, location, startDate, endDate } }) => {
    return (
      <Row px={4} py={2} space={2}>
        <Avatar source={{ uri: avatar }} />
        <Column>
          <Text>
            {title}{' '}
            <Text color="muted.500">
              · {startDate.format('YYYY')} - {endDate.format('YYYY')}
            </Text>
          </Text>
          <Text color="muted.500">
            <Icon color="muted.500" size="4" as={Feather} name={'map-pin'} /> {location}
          </Text>
        </Column>
      </Row>
    )
  }
)
